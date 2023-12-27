<script>
	import { currentUserEmail, currentRegistration, entryStore } from '$lib/stores.js'
	import { sendToServer } from '$lib/Utilities.js'

	import FullRegistration from '../../lib/FullRegistration.svelte'

	let fetchingData = false
	let errorMessage = ''
	let preFlag = false
	let preData = null

	async function handleUserAction(action) {
		fetchingData = true
		errorMessage = ''
		let payload
		if (action === 'produceRegistrationEmail') {
			const userEmail = window.prompt('What email address to send to?', $currentUserEmail)
			console.log(userEmail)
			payload = {
				action,
				data: { registrationEmail: $currentUserEmail, sendToEmail: 'george@westborn.com.au' }
			}
		} else {
			payload = {
				action,
				data: $currentRegistration
			}
		}
		const response = await sendToServer(payload)
		if (response.result === 'error') {
			errorMessage = response.data
			fetchingData = false
			return
		}
		preData = response
		preFlag = true
		return
	}

	let btnClasses =
		'text-sm rounded-md bg-primary-300 px-5 py-1 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-400 hover:shadow-lg focus:bg-primary-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-200 active:shadow-lg'
</script>

<section class="container px-3 mx-auto max-w-prose">
	{#if $currentUserEmail}
		{#if $currentRegistration}
			<p>Options for registration {$currentRegistration.registrationId}</p>
			{#if errorMessage}
				<p class="p-1 mt-2 text-red-500">{errorMessage}</p>
			{:else}
				<p class="p-1 mt-2">&nbsp</p>
			{/if}
			<div class="flex justify-between max-w-[320px] gap-4">
				<button
					type="button"
					on:click={() => handleUserAction('setRegistrationComplete')}
					class={btnClasses}
					>Update to Complete
				</button>

				<button
					type="button"
					on:click={() => handleUserAction('clearRegistrationComplete')}
					class={btnClasses}
					>Update to NOT Complete
				</button>

				<button
					type="button"
					on:click={() => handleUserAction('produceRegistrationEmail')}
					class={btnClasses}>Email summary to:</button
				>
				<button
					type="button"
					on:click={() => handleUserAction('listRegistrations')}
					class={btnClasses}>Registration Email List:</button
				>
			</div>
			<FullRegistration />
			{#if preFlag}
				<pre>{JSON.stringify(preData, null, 4)}</pre>
			{/if}
		{/if}
	{:else}
		<p>No registration selected - please go to "Select Registration"</p>
	{/if}
</section>
