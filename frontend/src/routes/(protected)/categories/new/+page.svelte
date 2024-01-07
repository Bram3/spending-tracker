<script lang="ts">
	import { Helper, Label, Input, Button, Spinner } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, errors, constraints, enhance, message, delayed } = superForm(data.newForm, {
		delayMs: 0
	});
</script>

<div class="grid grid-flow-row gap-7 p-5">
	<form
		class="flex w-full flex-col space-y-6 md:w-1/2 lg:w-1/3 xl:w-1/4"
		method="POST"
		use:enhance
		action="?/new"
	>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Nieuwe categorie</h3>
		{#if $message}<Helper class="mt-2" helperClass="text-lg" color="red">{$message}</Helper>{/if}

		<Label class="space-y-2">
			<span>Naam</span>
			<Input
				type="text"
				name="name"
				id="name"
				placeholder="Categorie naam"
				required
				bind:value={$form.name}
				{...$constraints.name}
			/>
			{#if $errors.name}<Helper class="mt-2" color="red">{$errors.name}</Helper>{/if}
		</Label>
		<Button type="submit" class="w-full">
			{#if $delayed}
				<Spinner size="5" />
			{:else}
				Maak categorie aan
			{/if}
		</Button>
	</form>
</div>
