// src/routes/contact/+page.ts
import type { PageLoad } from './$types';
import { parse } from 'node-html-parser';

export interface ContactFormField {
    name: string;
    type: 'text' | 'email' | 'select' | 'textarea';
    required: boolean;
    label: string;
    options?: string[];
}

export const load: PageLoad = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_PUBLIC_WORDPRESS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query NewQuery {
                        page(id: "cG9zdDo1Mg==") {
                            content
                        }
                    }
                `
            })
        });
      
        const { data } = await response.json();
        const contentHTML = data.page.content;

        const formFields = extractContactFormFields(contentHTML);
        return {
            formFields
        };
    } catch (error) {
        console.error('Error fetching contact form content:', error);

        return {
            formFields: []
        };
    }
};

function extractContactFormFields(htmlContent: string): ContactFormField[] {
    const root = parse(htmlContent);
    const form = root.querySelector('form.wpcf7-form');
    
    if (!form) {
        console.error('No Contact Form 7 form found in the HTML');
        return [];
    }

    const fields: ContactFormField[] = [];

    // Parse input and select fields
    const inputFields = form.querySelectorAll('input.wpcf7-form-control, textarea.wpcf7-form-control, select.wpcf7-form-control');
    
    inputFields.forEach(field => {
        const name = field.getAttribute('name');
        const labelElement = field.closest('label');
        
        if (name && name !== '_wpcf7') {
            let fieldType: ContactFormField['type'];

            // Determine field type
            if (field.tagName.toLowerCase() === 'select') {
                fieldType = 'select';
            } else if (field.getAttribute('type') === 'email') {
                fieldType = 'email';
            } else if (field.tagName.toLowerCase() === 'textarea') {
                fieldType = 'textarea';
            } else {
                fieldType = 'text';
            }

            const fieldInfo: ContactFormField = {
                name,
                type: fieldType,
                label: labelElement ? labelElement.textContent.replace(/\n/g, '').trim() : name,
                required: field.hasAttribute('aria-required') && field.getAttribute('aria-required') === 'true'
            };

            // Handle select options with type safety
            if (fieldType === 'select') {
                const optionElements = field.querySelectorAll('option');
                const options = Array.from(optionElements)
                    .map(option => option.getAttribute('value'))
                    .filter((option): option is string => option !== null && option !== undefined);
                
                if (options.length > 0) {
                    fieldInfo.options = options;
                }
            }

            fields.push(fieldInfo);
        }
    });

    return fields;
}
