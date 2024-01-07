<script>
	import { NavBrand, Navbar } from 'flowbite-svelte';
</script>

<div class="min-h-screen">
	<Navbar fluid={true}>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white"
				>Spending Tracker</span
			>
		</NavBrand>
	</Navbar>
	<slot />
</div>
