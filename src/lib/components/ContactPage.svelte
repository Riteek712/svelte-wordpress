<script lang="ts">
	type FormFieldType = 'text' | 'email' | 'select' | 'textarea';

	interface FormField {
		name: string;
		type: FormFieldType;
		label: string;
		required: boolean;
		options?: string[];
	}

	export let content: FormField[] = [];

	// Update FormData type to explicitly include 'agreed'
	type FormData = {
		[key: string]: string | boolean;
		agreed: boolean;
	};

	let formData: FormData = {
		// Initialize agreed with a default value
		agreed: false,
		// Dynamically add other fields
		...content.reduce((acc: { [key: string]: string }, field: FormField) => {
			acc[field.name] = '';
			return acc;
		}, {})
	};

	let errors: { [key: string]: string } = {};

	// Initialize errors based on the content
	$: {
		errors = content.reduce((acc: { [key: string]: string }, field: FormField) => {
			acc[field.name] = '';
			return acc;
		}, {});
	}

	function validateField(field: FormField, value: string): boolean {
		if (field.required && !value) {
			errors[field.name] = `${field.label} is required`;
			return false;
		}
		errors[field.name] = '';
		return true;
	}

	function submitForm(event: Event): void {
		event.preventDefault();
		let isValid = true;

		// Validate all fields
		content.forEach(field => {
			if (!validateField(field, formData[field.name] as string)) {
				isValid = false;
			}
		});

		// Check agreement checkbox
		if (!formData.agreed) {
			alert("Please agree to the terms and conditions.");
			isValid = false;
		}

		if (isValid) {
			alert('Form submitted successfully!');
		}
	}
</script>

<div class="bg-grey-00 mt-6 max-w-5xl mx-auto py-12 px-6 flex flex-col justify-center md:flex-row gap-8">
	<!-- Dynamic Contact Form -->
	<div class="p-8 shadow-2xl rounded-lg flex-none w-full md:w-3/5">
		<form on:submit={submitForm} class="flex flex-col space-y-4">
			{#each content as field}
				{#if field.type === 'text' || field.type === 'email'}
					<input 
						type={field.type} 
						bind:value={formData[field.name]}
						placeholder="{field.label} {field.required ? '*' : ''}"
						class="w-full p-3 border rounded-lg {errors[field.name] ? 'border-red-500' : ''}"
						required={field.required}
					/>
					{#if errors[field.name]}
						<p class="text-red-500 text-sm">{errors[field.name]}</p>
					{/if}
				{:else if field.type === 'select'}
					<select 
						bind:value={formData[field.name]}
						class="w-full p-3 border rounded-lg {errors[field.name] ? 'border-red-500' : ''}"
						required={field.required}
					>
						<option value="" disabled selected>Select {field.label}</option>
						{#each field.options || [] as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
					{#if errors[field.name]}
						<p class="text-red-500 text-sm">{errors[field.name]}</p>
					{/if}
				{:else if field.type === 'textarea'}
					<textarea 
						bind:value={formData[field.name]}
						placeholder="{field.label} {field.required ? '*' : ''}"
						class="w-full p-3 border rounded-lg {errors[field.name] ? 'border-red-500' : ''}"
						required={field.required}
					></textarea>
					{#if errors[field.name]}
						<p class="text-red-500 text-sm">{errors[field.name]}</p>
					{/if}
				{/if}
			{/each}

			<div class="flex items-center">
				<input 
					type="checkbox" 
					bind:checked={formData.agreed} 
					class="mr-2" 
					required 
				/>
				<label>I agree to the terms and conditions and privacy policy.</label>
			</div>

			<button 
				type="submit" 
				class="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
			>
				Send Message
			</button>
		</form>
	</div>

	<!-- Contact Info -->
	<div class="bg-white p-8 shadow-2xl rounded-lg flex-none w-full md:w-3/5 flex flex-col justify-center">
		<div class="space-y-4">
			<div class="flex items-center space-x-3">
				<span class="text-green-500 text-xl">✉️</span>
				<p class="text-gray-700">info@example.com</p>
			</div>
			<div class="flex items-center space-x-3">
				<span class="text-green-500 text-xl">📞</span>
				<p class="text-gray-700">+1 234 567 899</p>
			</div>
			<div class="flex items-center space-x-3">
				<span class="text-green-500 text-xl">📍</span>
				<p class="text-gray-700">Lorem LLC, Street 123, Tallinn, Estonia</p>
			</div>
		</div>
	</div>
</div>