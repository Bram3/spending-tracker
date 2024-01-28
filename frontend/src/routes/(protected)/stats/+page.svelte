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

	export let data: PageData;
</script>

<div class="grid grid-flow-row gap-7 p-5">
	<div class="block w-full">
		<P class="text-2xl font-bold">Totaal uitgegeven: €{data.totalSpent}</P>
	</div>

</div>
