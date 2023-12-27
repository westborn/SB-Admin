<script>
	import { goto } from '$app/navigation'
	import { base } from '$app/paths'

	import { currentUserEmail, currentRegistration, entryStore } from '$lib/stores.js'
	import { validateEmail, sendToServer } from '$lib/Utilities.js'

	let fetchingData = false
	let errorMessage = ''

	async function validateEmailAndFetchData(email) {
		if (!validateEmail(email)) {
			return { result: 'error', data: 'Please enter a valid email address' }
		}
		const payload = {
			action: 'getDetailsByEmail',
			data: { email }
		}
		try {
			const response = await sendToServer(payload)
			return response
		} catch (error) {
			return { result: 'error', data: error.message }
		}
	}

	function handleServerResponse(response) {
		if (response.result === 'error') {
			return response.data
		}
		if (Object.entries(response.data.registration).length === 0) {
			return 'No registration found for that email address'
		}
		currentRegistration.set(response.data.registration)
		entryStore.set(response.data.entries)
		goto(`${base}/SelectOption`)
	}

	async function handleEmailClick() {
		$currentUserEmail = $currentUserEmail.toLowerCase()
		fetchingData = true
		errorMessage = ''
		const response = await validateEmailAndFetchData($currentUserEmail)
		errorMessage = handleServerResponse(response)
		fetchingData = false
	}

	let btnClasses =
		'text-sm rounded-md bg-primary-300 px-5 py-1 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-400 hover:shadow-lg focus:bg-primary-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-200 active:shadow-lg'
</script>

<section class="container px-3 mx-auto max-w-prose">
	<p>Display a current registration for:</p>
	<div class="relative w-full mt-6">
		<input
			autofocus
			id="email"
			name="email"
			bind:value={$currentUserEmail}
			type="text"
			class="w-full h-10 placeholder-transparent lowercase border-gray-300 rounded-md peer focus:border-primary-50 focus:outline-none"
			placeholder="someone@gmail.com"
		/>
		<label
			for="email"
			class="absolute text-sm text-gray-600 transition-all left-2 -top-5 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-gray-600"
			>Email address</label
		>
	</div>

	{#if errorMessage}
		<p class="p-1 mt-2 text-red-500">{errorMessage}</p>
	{:else}
		<p class="p-1 mt-2">&nbsp;</p>
	{/if}
	<div class="flex justify-between">
		<button type="button" on:click={() => handleEmailClick()} class={btnClasses}
			>Display Registration
		</button>
	</div>

	{#if fetchingData}
		<div
			style="border-top-color:transparent"
			class="w-16 h-16 m-6 border-8 border-solid rounded-full animate-spin border-accent"
		/>
	{/if}
</section>
