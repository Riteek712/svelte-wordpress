import type { PageLoad } from './$types';
import { parse, HTMLElement } from 'node-html-parser';
export const load: PageLoad = async ({ fetch }) => {
    try {
      const response = await fetch( import.meta.env.VITE_PUBLIC_WORDPRESS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query NewQuery {
              page(id: "cG9zdDoy") {
                id
                content
              }
            }
          `
        })
      });
  
      const { data } = await response.json();
  
      const contentHTML = data.page.content;
      const sections = extractSectionsFromHTML(contentHTML);
  
      return {
        wordpressContent: sections
      };
    } catch (error) {
      console.error('Error fetching WordPress content:', error);
  
      return {
        wordpressContent: {
          heroSection: {},
          problemSection: {},
          advantagesSection: {},
          testimonialsSection: {}
        }
      };
    }
  };
  
  function extractSectionsFromHTML(htmlContent: string) {
    const root: HTMLElement = parse(htmlContent);
  
    return {
      heroSection: extractHeroSection(root),
      problemSection: extractProblemSection(root),
      advantagesSection: extractAdvantagesSection(root),
      testimonialsSection: extractTestimonialsSection(root)
    };
  }
  
  function extractHeroSection(root: HTMLElement) {
    const heroGroup = root.querySelector('.wp-block-group.alignfull.is-style-section-1');
    if (!heroGroup) return {};
  
    return {
      title: heroGroup.querySelector('h2')?.textContent.trim() || '',
      subtitle: heroGroup.querySelector('p.is-style-text-subtitle')?.textContent.trim() || '',
      ctaButton: heroGroup.querySelector('.wp-block-button__link')?.textContent.trim() || '',
      heroImage: heroGroup.querySelector('figure.wp-block-image img')?.getAttribute('src') || ''
    };
  }
  
  function extractProblemSection(root: HTMLElement) {
    const problemColumns = root.querySelectorAll('.wp-block-columns .wp-block-column');
    if (problemColumns.length === 0) return {};
  
    return {
      sectionTitle: root.querySelector('h2:contains("The Problem We Solve")')?.textContent.trim() || '',
      problems: problemColumns.map(column => ({
        percentage: column.querySelector('h2')?.textContent.trim() || '',
        description: column.querySelector('p')?.textContent.trim() || '',
        image: column.querySelector('figure.wp-block-image img')?.getAttribute('src') || ''
      }))
    };
  }
  
  function extractAdvantagesSection(root: HTMLElement) {
    const advantagesTitle = root.querySelector('p:contains("Advantages")')?.textContent.trim() || '';
    
    // Find the specific columns for Before and After
    const beforeColumn = root.querySelector('.wp-block-column h4:contains("Befour")')?.closest('.wp-block-column');
    const afterColumn = root.querySelector('.wp-block-column h4:contains("After")')?.closest('.wp-block-column');
  
    return {
      sectionTitle: advantagesTitle,
      beforeState: {
        title: 'Before',
        items: beforeColumn 
          ? Array.from(beforeColumn.querySelectorAll('ul li'))
            .map(li => li.textContent.trim())
            .filter(item => item)
          : []
      },
      afterState: {
        title: 'After',
        items: afterColumn
          ? Array.from(afterColumn.querySelectorAll('ul li'))
            .map(li => li.textContent.trim())
            .filter(item => item)
          : []
      }
    };
  }
  
  function extractTestimonialsSection(root: HTMLElement) {
    const testimonialsTitle = root.querySelector('p:contains("Testimonials")');
    if (!testimonialsTitle) return {};
  
    const testimonialColumns = root.querySelectorAll('.wp-block-columns .wp-block-column');
  
    return {
      sectionTitle: testimonialsTitle.textContent.trim(),
      testimonials: testimonialColumns.map(column => {
        const quote = column.querySelector('blockquote');
        if (!quote) return null;
  
        return {
          text: quote.querySelector('p')?.textContent.trim() || '',
          name: quote.querySelector('cite')?.textContent.trim() || '',
          position: quote.querySelector('cite strong')?.textContent.trim() || '',
          company: quote.querySelector('cite sub')?.textContent.trim() || ''
        };
      }).filter(testimonial => testimonial !== null)
    };
  }