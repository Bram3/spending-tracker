<script lang="ts">
    import { EditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { superForm } from 'sveltekit-superforms/client';
    import { enhance } from '$app/forms';
    import { toast } from '@zerodevx/svelte-toast';
	import { Input, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

    export let data: PageData;
	let categorySearchTerm = '';
	$: categoryFilteredItems = data.stats.categoryStats.filter(
		(item: { name: string }) =>
			item.name.toLowerCase().indexOf(categorySearchTerm.toLowerCase()) !== -1
	);
	let supplierSearchTerm = '';
	$: supplierFilteredItems = data.stats.supplierStats.filter(
		(item: { name: string }) =>
			item.name.toLowerCase().indexOf(supplierSearchTerm.toLowerCase()) !== -1
	);
</script>

<div class="grid grid-flow-row gap-7 p-5">
	{#if data.stats.paymentMethodStats}
	<div class="grid grid-flow-row gap-7">
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>Betaal Methode</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()}</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()-1}</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()-2}</TableHeadCell>
				<TableHeadCell>Januari</TableHeadCell>
				<TableHeadCell>Februari</TableHeadCell>
				<TableHeadCell>Maart</TableHeadCell>
				<TableHeadCell>April</TableHeadCell>
				<TableHeadCell>Mei</TableHeadCell>
				<TableHeadCell>Juni</TableHeadCell>
				<TableHeadCell>Juli</TableHeadCell>
				<TableHeadCell>Augustus</TableHeadCell>
				<TableHeadCell>September</TableHeadCell>
				<TableHeadCell>Oktober</TableHeadCell>
				<TableHeadCell>November</TableHeadCell>
				<TableHeadCell>December</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each data.stats.paymentMethodStats as item}
					<TableBodyRow>
						<TableBodyCell>{item.name}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.thisYear.total*100)/100}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.lastYear.total*100)/100}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.yearBeforeLastYear.total*100)/100}</TableBodyCell>
						{#each item.thisYear.months as total}
							<TableBodyCell>€{Math.round(total*100)/100}</TableBodyCell>
						{/each}
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	{/if}
	<div class="block w-full">
		<div class="float-right grid gap-7">
			<Input
				type="text"
				name="search"
				id="search"
				placeholder="Zoek"
				required
				bind:value={categorySearchTerm}
			/>
		</div>
	</div>
	{#if data.stats.categoryStats}
	<div class="grid grid-flow-row gap-7">
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>Categorie</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()}</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()-1}</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()-2}</TableHeadCell>
				<TableHeadCell>Januari</TableHeadCell>
				<TableHeadCell>Februari</TableHeadCell>
				<TableHeadCell>Maart</TableHeadCell>
				<TableHeadCell>April</TableHeadCell>
				<TableHeadCell>Mei</TableHeadCell>
				<TableHeadCell>Juni</TableHeadCell>
				<TableHeadCell>Juli</TableHeadCell>
				<TableHeadCell>Augustus</TableHeadCell>
				<TableHeadCell>September</TableHeadCell>
				<TableHeadCell>Oktober</TableHeadCell>
				<TableHeadCell>November</TableHeadCell>
				<TableHeadCell>December</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each categoryFilteredItems as item}
					<TableBodyRow>
						<TableBodyCell>{item.name}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.thisYear.total*100)/100}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.lastYear.total*100)/100}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.yearBeforeLastYear.total*100)/100}</TableBodyCell>
						{#each item.thisYear.months as total}
							<TableBodyCell>€{Math.round(total*100)/100}</TableBodyCell>
						{/each}
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	{/if}
	<div class="block w-full">
		<div class="float-right grid gap-7">
			<Input
				type="text"
				name="search"
				id="search"
				placeholder="Zoek"
				required
				bind:value={supplierSearchTerm}
			/>
		</div>
	</div>
	{#if data.stats.supplierStats}
	<div class="grid grid-flow-row gap-7">
		<Table hoverable={true}>
			<TableHead>
				<TableHeadCell>Leverancier</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()}</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()-1}</TableHeadCell>
				<TableHeadCell>{new Date().getFullYear()-2}</TableHeadCell>
				<TableHeadCell>Januari</TableHeadCell>
				<TableHeadCell>Februari</TableHeadCell>
				<TableHeadCell>Maart</TableHeadCell>
				<TableHeadCell>April</TableHeadCell>
				<TableHeadCell>Mei</TableHeadCell>
				<TableHeadCell>Juni</TableHeadCell>
				<TableHeadCell>Juli</TableHeadCell>
				<TableHeadCell>Augustus</TableHeadCell>
				<TableHeadCell>September</TableHeadCell>
				<TableHeadCell>Oktober</TableHeadCell>
				<TableHeadCell>November</TableHeadCell>
				<TableHeadCell>December</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each supplierFilteredItems as item}
					<TableBodyRow>
						<TableBodyCell>{item.name}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.thisYear.total*100)/100}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.lastYear.total*100)/100}</TableBodyCell>
						<TableBodyCell>€{Math.round(item.yearBeforeLastYear.total*100)/100}</TableBodyCell>
						{#each item.thisYear.months as total}
							<TableBodyCell>€{Math.round(total*100)/100}</TableBodyCell>
						{/each}
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
	{/if}
</div>
