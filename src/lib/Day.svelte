<script lang="ts">
	import { Checkbox, NumberInput } from '@svelteuidev/core';
	import { days_stores } from './stores';
	import { get } from 'svelte/store';
	import { days_of_week_uc } from './constants';

	export let day: number = 0;
	let checked: boolean;

	const day_store = days_stores[day];
	let inputs: number[] = [];

	day_store.subscribe((v) => {
		if (v?.length > 0) {
			inputs = v;
			checked = true;
		}
	});

	$: if (checked) {
		if (get(day_store) != inputs) day_store.set(inputs);
	} else {
		day_store.set([]);
	}

	const selectionHandler = () => {
		day_store.set(inputs);
	};
</script>

<div
	class="flex-grow flex flex-row items-center justify-between w-full max-w-[30rem] gap-2"
	class:opacity-50={!checked}
>
	<div class="flex flex-row items-center">
		<Checkbox class="pr-6" bind:checked />
		<div class="flex-grow" class:line-through={!checked}>{days_of_week_uc[day]}</div>
	</div>
	<div class="flex flex-row items-center w-[60%]">
		<NumberInput
			size="xs"
			placeholder="-"
			disabled={!checked}
			bind:value={inputs[0]}
			on:input={selectionHandler}
		/>
		<NumberInput
			size="xs"
			placeholder="-"
			disabled={!checked}
			bind:value={inputs[1]}
			on:input={selectionHandler}
		/>
		<NumberInput
			size="xs"
			placeholder="-"
			disabled={!checked}
			bind:value={inputs[2]}
			on:input={selectionHandler}
		/>
	</div>
</div>
