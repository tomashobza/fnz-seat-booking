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
	<div class="flex-grow flex flex-row items-center justify-between w-full max-w-[30rem] gap-2">
		<div class="flex flex-row items-center">
			<!-- <Checkbox class="pr-6" bind:checked />
		<div class="flex-grow" class:line-through={!checked}>{days_of_week_uc[day]}</div> -->
		</div>
		<div class="flex flex-row items-center w-[60%]">
			<div>lol</div>
			<div>lol</div>
			<div>lol</div>
		</div>
	</div>
	{#each [0, 1, 2, 3, 4] as day}
		<Day {day} />
	{/each}
	<Button class="mb-4" on:click={handleSave} disabled={loading}>Save</Button>
</div>
