<script>
	let name = "";
	let email = "";
	let companyName = "";
	let jobTitle = "";
	let inquiryType = "";
	let message = "";
	let agreed = false;
  
	function submitForm() {
	  if (!agreed) {
		alert("Please agree to the terms and conditions.");
		return;
	  }
	  console.log({ name, email, companyName, jobTitle, inquiryType, message });
	}
  </script>

  
  <div class="bg-grey-00 mt-6 max-w-5xl mx-auto py-12 px-6 flex flex-col justify-center md:flex-row gap-8">
	<!-- Contact Form -->
	<div class="p-8 shadow-2xl rounded-lg flex-none w-full md:w-3/5">
	  
	  
	  <form on:submit|preventDefault={submitForm} class="flex flex-col space-y-4">
		<input type="text" bind:value={name} placeholder="Name *" class="w-full p-3 border rounded-lg" required />
		<input type="email" bind:value={email} placeholder="Email *" class="w-full p-3 border rounded-lg" required />
		<input type="text" bind:value={companyName} placeholder="Company Name" class="w-full p-3 border rounded-lg" />
		<input type="text" bind:value={jobTitle} placeholder="Job Title" class="w-full p-3 border rounded-lg" />
		<select bind:value={inquiryType} class="w-full p-3 border rounded-lg" required>
		  <option value="" disabled selected>Select Inquiry Type</option>
		  <option value="General Inquiry">General Inquiry</option>
		  <option value="Product Demo">Product Demo</option>
		  <option value="Support Request">Support Request</option>
		</select>
		<textarea bind:value={message} placeholder="Message *" class="w-full p-3 border rounded-lg" required></textarea>
		
		<div class="flex items-center">
		  <input type="checkbox" bind:checked={agreed} class="mr-2" required />
		  <label>I agree to the terms and conditions and privacy policy.</label>
		</div>
		
		<button type="submit" class="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">Send Message</button>
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
  