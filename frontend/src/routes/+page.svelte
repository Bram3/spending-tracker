<script lang="ts">
	import { Button, P } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
</script>

<div class="container mx-auto flex h-full items-center justify-center">
	<div class="flex flex-col items-center space-y-10 text-center">
		<P size="5xl" weight="bold">Spending Tracker</P>
		<Button
			on:click={() => {
				goto('/transactions');
			}}
			size="xl">Dashboard</Button
		>
	</div>
</div>
