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
			<h3 class="text-xl font-medium text-gray-900 dark:text-white">Maak een account aan</h3>
			{#if $message}<Helper class="mt-2" helperClass="text-lg" color="red">{$message}</Helper>{/if}
			<Label class="space-y-2">
				<span>Email</span>
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
				<span>Wachtwoord</span>
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
			<Label class="space-y-2">
				<span>Wachtwoord herhalen</span>
				<Input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					placeholder="•••••"
					required
					bind:value={$form.confirmPassword}
					{...$constraints.confirmPassword}
				/>
				{#if $errors.confirmPassword}<Helper class="mt-2" color="red"
						>{$errors.confirmPassword}</Helper
					>{/if}
			</Label>
			<Button type="submit" class="w-full">
				{#if $delayed}
					<Spinner size="5" />
				{:else}
					Maak account aan
				{/if}
			</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Heb je al een account? <a
					href="/auth/login"
					class="text-primary-700 dark:text-primary-500 hover:underline"
				>
					Login
				</a>
			</div>
		</form>
	</Card>
</div>
