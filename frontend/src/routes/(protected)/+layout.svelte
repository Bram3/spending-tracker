<script lang="ts">
	import {
		Avatar,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar
	} from 'flowbite-svelte';
	import type { LayoutData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	export let data: LayoutData;
	$: activeUrl = $page.url.pathname;
	export const currentUrl = writable('');

	onMount(() => {
		currentUrl.set($page.url.pathname.split('/')[1]);
	});

	function handleClick(event: any) {
		currentUrl.set(event.target.attributes.href.value);
	}

	currentUrl.subscribe((value) => {
		activeUrl = value;
	});
</script>

<div class="min-h-screen">
	<Navbar fluid={true}>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white"
				>Spending Tracker</span
			>
		</NavBrand>
		<div class="flex items-center md:order-2">
			<Avatar id="avatar-menu" class="cursor-pointer" />
			<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">{data.user.email}</span>
			</DropdownHeader>
			<DropdownItem
				on:click={() => {
					goto('/auth/logout');
				}}>Uitloggen</DropdownItem
			>
		</Dropdown>
		<NavUl {activeUrl}>
			<NavLi href="/transactions" on:click={handleClick}>Uitgaven</NavLi>
			<NavLi href="/categories" on:click={handleClick}>Categorieën</NavLi>
			<NavLi href="/suppliers" on:click={handleClick}>Leveranciers</NavLi>
		</NavUl>
	</Navbar>

	<slot />
</div>
