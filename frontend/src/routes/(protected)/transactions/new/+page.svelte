<script lang="ts">
	import { Helper, Label, Input, Button, Spinner, Select, Fileupload } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	const { form, errors, constraints, enhance, message, delayed } = superForm(data.newForm, {
		delayMs: 0
	});

	onMount(() => {
		$form.date = new Date().toJSON().slice(0, 10);
	});

	let categories: any = [];
	$: data.categories.forEach((category: { id: any; name: any }) => {
		categories.push({
			value: category.id,
			name: category.name
		});
	});

	let suppliers: any = [];
	$: data.suppliers.forEach((supplier: { id: any; name: any }) => {
		suppliers.push({
			value: supplier.id,
			name: supplier.name
		});
	});

	function changeCategory() {
		const supplier = data.suppliers.find(
			(supplier: { id: any }) => supplier.id === $form.supplierId
		);
		if (supplier) {
			$form.categoryId = supplier.defaultCategoryId;
		}
	}
</script>

<div class="grid grid-flow-row gap-7 p-5">
	<form
		class="flex w-full flex-col space-y-6 md:w-1/2 lg:w-1/3 xl:w-1/4"
		method="POST"
		use:enhance
		action="?/new"
		enctype="multipart/form-data"
	>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Nieuwe Uitgave</h3>
		{#if $message}<Helper class="mt-2" helperClass="text-lg" color="red">{$message}</Helper>{/if}

		<Label class="space-y-2">
			<span>Omschrijving</span>
			<Input
				type="text"
				name="description"
				id="description"
				placeholder="Omschrijving"
				required
				bind:value={$form.description}
				{...$constraints.description}
			/>
			{#if $errors.description}<Helper class="mt-2" color="red">{$errors.description}</Helper>{/if}
		</Label>
		<Label class="space-y-2">
			<span>Leverancier</span>
			<Select
				type="text"
				name="supplierId"
				id="supplierId"
				required
				items={suppliers}
				on:change={changeCategory}
				bind:value={$form.supplierId}
				{...$constraints.supplierId}
			/>
			{#if $errors.supplierId}<Helper class="mt-2" color="red">{$errors.supplierId}</Helper>{/if}
		</Label>
		<Label class="space-y-2">
			<span>Categorie</span>
			<Select
				type="text"
				name="categoryId"
				id="categoryId"
				required
				items={categories}
				bind:value={$form.categoryId}
				{...$constraints.categoryId}
			/>
			{#if $errors.categoryId}<Helper class="mt-2" color="red">{$errors.categoryId}</Helper>{/if}
		</Label>
		<Label class="space-y-2">
			<span>Datum</span>
			<Input
				type="date"
				name="date"
				id="date"
				placeholder={new Date().toJSON().slice(0, 10)}
				required
				bind:value={$form.date}
				{...$constraints.date}
			/>
			{#if $errors.date}<Helper class="mt-2" color="red">{$errors.date}</Helper>{/if}
		</Label>
		<Label class="space-y-2">
			<span>Kostprijs</span>
			<Input
				type="number"
				name="amount"
				id="amount"
				placeholder={0.0}
				step={0.01}
				required
				bind:value={$form.amount}
				{...$constraints.amount}
			/>
			{#if $errors.amount}<Helper class="mt-2" color="red">{$errors.amount}</Helper>{/if}
		</Label>
		<Label class="space-y-2">
			<span>Betaalmethode</span>
			<Select
				type="text"
				name="paymentMethod"
				id="paymentMethod"
				required
				items={[
					{
						value: 'Cash',
						name: 'Cash'
					},
					{
						value: 'Bank',
						name: 'Bank'
					}
				]}
				bind:value={$form.paymentMethod}
				{...$constraints.paymentMethod}
			/>
			{#if $errors.paymentMethod}<Helper class="mt-2" color="red">{$errors.paymentMethod}</Helper
				>{/if}
		</Label>
		<Label class="space-y-2">
			<span>Bijlagen</span>
			<Fileupload accept="image/*" name="files" id="files" multiple />
		</Label>

		<Button type="submit" class="w-full">
			{#if $delayed}
				<Spinner size="5" />
			{:else}
				Maak uitgave aan
			{/if}
		</Button>
	</form>
</div>
