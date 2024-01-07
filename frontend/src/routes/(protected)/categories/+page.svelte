<script lang="ts">
	import {
		Button,
		Helper,
		Input,
		Label,
		Listgroup,
		ListgroupItem,
		Modal,
		P,
		Spinner
	} from 'flowbite-svelte';
	import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';

	let searchTerm = '';
	$: filteredItems = data.categories.filter(
		(item: { name: string }) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
	);

	import { getNotificationsContext } from 'svelte-notifications';

	const { addNotification } = getNotificationsContext();

	export let data: PageData;
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
		<div class="float-right grid grid-cols-2 gap-7">
			<Input
				type="text"
				name="search"
				id="search"
				placeholder="Search"
				required
				bind:value={searchTerm}
			/>
			<Button on:click={() => goto('/categories/new')}>New Category</Button>
		</div>
	</div>
	{#if data.categories}
		<div class="grid grid-flow-row gap-7 p-5">
			<Listgroup>
				{#each filteredItems as category}
					<ListgroupItem>
						<div class="flex items-center justify-between">
							<P size="2xl">{category.name}</P>
							<div class="flex items-center">
								<form method="POST" use:enhance={onSubmitDelete} action="?/delete">
									<input type="hidden" name="id" value={category.id} />
									<div class="ml-4 flex flex-col items-center">
										<!-- svelte-ignore a11y-missing-attribute -->
										<button
											type="submit"
											class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
										>
											<TrashBinOutline />
										</button>
									</div>
								</form>
							</div>
						</div>
					</ListgroupItem>
				{/each}
			</Listgroup>
		</div>
	{/if}
</div>
