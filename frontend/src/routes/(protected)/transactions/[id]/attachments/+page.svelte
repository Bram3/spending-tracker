<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
	import { Button, Fileupload, Label, P } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Gallery } from 'flowbite-svelte';
	export let data: PageData;

	let images: any = [];

	data.attachments.forEach((attachment: { id: any; name: any }) => {
		images.push({
			id: attachment.id,
			src: `${$page.url}/${attachment.id}`,
			alt: attachment.name
		});
	});

	function getId(src: any): number {
		const image = images.find((image: { src: any }) => image.src === src);
		return image ? image.id : -1;
	}
</script>

<div class="grid grid-flow-row gap-7 p-5">
	<form
		class="flex w-full flex-col space-y-6 md:w-1/2 lg:w-1/3 xl:w-1/4"
		action="?/upload"
		method="POST"
		enctype="multipart/form-data"
	>
		<Label class="space-y-2">
			<span>Bijlagen</span>
			<Fileupload accept="image/*" name="files" id="files" multiple />
		</Label>
		<Button type="submit" class="w-full">Upload</Button>
	</form>

	{#if images.length === 0}
		<P class="text-center">Geen bijlagen gevonden.</P>
	{:else}
		<Gallery items={images} class="grid grid-cols-1 gap-4 md:grid-cols-3" let:item>
			<div class="relative">
				<img src={item.src} alt={item.alt} class="h-auto max-w-full object-contain" />
				<form method="POST" use:enhance action="?/delete">
					<input type="hidden" name="id" value={getId(item.src)} />
					<button class="absolute right-0 top-0 m-2 h-5 w-5 rounded-full text-red-500">
						<TrashBinOutline class="h-5 w-5" />
					</button>
				</form>
			</div>
		</Gallery>
	{/if}
</div>
