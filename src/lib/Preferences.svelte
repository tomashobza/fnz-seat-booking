<script lang="ts">
	import { onMount } from 'svelte';
	import Day from './Day.svelte';
	import { Button } from '@svelteuidev/core';
	import { save_preferences } from '$lib';
	import toast from 'svelte-french-toast';
	import { get_users_preference } from './db';

	export let open: boolean = false;
	let loading = false;

	const handleSave = () => {
		loading = true;
		save_preferences()
			?.then((res) => {
				// console.log(res);
				toast.success('Preferences saved!');
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong. 😿');
			})
			.finally(() => {
				loading = false;
			}) ?? (loading = false);
	};

	onMount(get_users_preference);
</script>

<div
	style="height: {open ? 60 : 0}%"
	class="transition-all duration-300 overflow-hidden flex flex-col items-center justify-around gap-4"
>
	{#each [0, 1, 2, 3, 4] as day}
		<Day {day} />
	{/each}
	<Button class="mb-4" on:click={handleSave} disabled={loading}>Save</Button>
</div>
