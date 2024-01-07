<script lang="ts">
	import { Card, Button, Label, Input, Checkbox, Helper, Spinner } from 'flowbite-svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { superForm } from 'sveltekit-superforms/client';

	const { form, errors, constraints, enhance, message, delayed } = superForm(data.form, {
		delayMs: 0
	});
</script>

<div class="grid h-screen grid-cols-1 items-center justify-items-center">
	<Card class="w-full max-w-md">
		<form class="flex flex-col space-y-6" method="POST" use:enhance>
			<h3 class="text-xl font-medium text-gray-900 dark:text-white">Login to Spending Tracker</h3>
			{#if $message}<Helper class="mt-2" helperClass="text-lg" color="red">{$message}</Helper>{/if}
			<Label class="space-y-2">
				<span>Username</span>
				<Input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					required
					bind:value={$form.email}
					{...$constraints.email}
				/>
				{#if $errors.email}<Helper class="mt-2" color="red">{$errors.email}</Helper>{/if}
			</Label>
			<Label class="space-y-2">
				<span>Password</span>
				<Input
					type="password"
					name="password"
					id="password"
					placeholder="•••••"
					required
					bind:value={$form.password}
					{...$constraints.password}
				/>
				{#if $errors.password}<Helper class="mt-2" color="red">{$errors.password}</Helper>{/if}
			</Label>
			<Button type="submit" class="w-full">
				{#if $delayed}
					<Spinner size="5" />
				{:else}
					Login to your account
				{/if}
			</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Don't have an account? <a
					href="/auth/register"
					class="text-primary-700 dark:text-primary-500 hover:underline"
				>
					Create account
				</a>
			</div>
		</form>
	</Card>
</div>
