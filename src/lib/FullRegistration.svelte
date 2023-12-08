<script>
	import { currentRegistration, entryStore } from '$lib/stores.js'

	import Accordion from '$lib/EntryAccordion.svelte'
	import TextList from '$lib/TextList.svelte'

	$: costOfRegistration = 20 + $entryStore.length * 20
	$: numberOfEntries = $entryStore.length === 1 ? `1 entry` : `${$entryStore.length} entries`
	$: registrationPaid =
		$currentRegistration?.confirmation === 'Complete' ? ' (Paid)' : ' (Not Paid)'
</script>

<div class="text-base">
	<p class="mt-2 text-red-400">
		This registration of {numberOfEntries} has a total fee of ${costOfRegistration}{registrationPaid}
	</p>
	<div class="mt-6 grid grid-cols-[13ch_1fr] items-center">
		<TextList
			item="Name"
			itemValue={`${$currentRegistration.firstName} ${$currentRegistration.lastName}`}
		/>
		<TextList item="Email" itemValue={$currentRegistration.email} />
		<TextList item="Phone" itemValue={$currentRegistration.phone} />
		<TextList item="Postcode" itemValue={$currentRegistration.postcode} />
		<TextList item="Bank Account" itemValue={$currentRegistration.bankAccountName} />
		<TextList item="BSB" itemValue={$currentRegistration.bankBSB} />
		<TextList item="Account" itemValue={$currentRegistration.bankAccount} />
		<TextList item="Transport" itemValue={$currentRegistration.transport} />
		<TextList item="Accommodation" itemValue={$currentRegistration.accommodation} />
		<TextList item="Crane" itemValue={$currentRegistration.crane} />
		<TextList item="Bump In" itemValue={$currentRegistration.bumpIn} />
		<TextList item="Bump Out" itemValue={$currentRegistration.bumpOut} />
		<TextList item="Requirements" itemValue={$currentRegistration.displayRequirements} />
	</div>
</div>
<div class="flex items-center mt-12">
	<div class="flex-grow border-t border-gray-400" />
	<span class="flex-shrink mx-4 text-gray-600">Entries</span>
	<div class="flex-grow border-t border-gray-400" />
</div>

<Accordion showButtons={false} />
