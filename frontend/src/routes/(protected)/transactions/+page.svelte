<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		Button,
		Card,
		Helper,
		Input,
		Label,
		Modal,
		Spinner,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { enhance } from '$app/forms';
	import { getNotificationsContext } from 'svelte-notifications';
	export let data: PageData;
	let searchTerm = '';

	$: filteredItems = data.transactions.filter(
		(item: { description: string }) =>
			item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);
	const { addNotification } = getNotificationsContext();

	const onSubmitDelete = () => {
		return ({ result, update }: any) => {
			if (result.type === 'error') {
				addNotification({
					text: result.error.message,
					position: 'top-right',
					type: 'error',
					removeAfter: 4000
				});
			} else {
				update();
			}
		};
	};
</script>

<div class="grid grid-flow-row gap-7 p-5">
	<div class="block w-full">
		<div class="grid grid-cols-2 items-center justify-center gap-7 md:float-right md:justify-end">
			<Input
				type="text"
				name="search"
				id="search"
				placeholder="Zoek"
				required
				bind:value={searchTerm}
			/>
			<Button on:click={() => goto('/transactions/new')}>Nieuwe uitgave</Button>
		</div>
	</div>
	<div class="grid grid-flow-row gap-7">
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>Omschrijving</TableHeadCell>
				<TableHeadCell>Kostprijs</TableHeadCell>
				<TableHeadCell>Betaal methode</TableHeadCell>
				<TableHeadCell>Categorie</TableHeadCell>
				<TableHeadCell>Leverancier</TableHeadCell>
				<TableHeadCell>Datum</TableHeadCell>
				<TableHeadCell>Gebruiker</TableHeadCell>
				<TableHeadCell></TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each filteredItems as item}
					<TableBodyRow>
						<TableBodyCell>{item.description}</TableBodyCell>
						<TableBodyCell>€{item.amount}</TableBodyCell>
						<TableBodyCell>{item.paymentMethod}</TableBodyCell>
						<TableBodyCell>{item.category.name}</TableBodyCell>
						<TableBodyCell>{item.supplier.name}</TableBodyCell>
						<TableBodyCell>{new Date(item.date).toLocaleDateString()}</TableBodyCell>
						<TableBodyCell>{item.user.email}</TableBodyCell>
						<TableBodyCell>
							<TableBodyCell>
								<div class="flex justify-between gap-4">
									<a
										href="/transactions/{item.id}/attachments"
										class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
									>
										Bijlagen
									</a>
									<a
										href="/transactions/{item.id}/edit"
										class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
									>
										Bewerken
									</a>
									<form method="POST" use:enhance={onSubmitDelete} action="?/delete">
										<input type="hidden" name="id" value={item.id} />
										<button
											type="submit"
											class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
										>
											Verwijderen
										</button>
									</form>
								</div>
							</TableBodyCell>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</div>
