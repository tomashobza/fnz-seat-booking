<script lang="ts">
	import { Checkbox, NumberInput } from '@svelteuidev/core';
	import { preference } from './stores';
	const days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

	export let day: number = 0;
	let checked: boolean;

	let inputs: number[] = [];

	preference.subscribe((v) => {
		if (Object.keys(v).find((key) => key == `${days_of_week[day].toLocaleLowerCase()}`)) {
			inputs = v[days_of_week[day].toLocaleLowerCase()];
		}
	});

	$: if (checked) {
		preference.update((v) => {
			if (Object.keys(v).find((key) => key == `${days_of_week[day].toLocaleLowerCase()}`)) {
				v[days_of_week[day].toLocaleLowerCase()] = inputs;
			}
			console.log('updating', days_of_week[day].toLocaleLowerCase(), v);
			return v;
		});
	}
</script>

<div
	class="flex-grow flex flex-row items-center justify-between w-full max-w-[30rem] gap-2"
	class:opacity-50={!checked}
>
	<div class="flex flex-row items-center">
		<Checkbox class="pr-6" bind:checked />
		<div class="flex-grow" class:line-through={!checked}>{days_of_week[day]}</div>
	</div>
	<div class="flex flex-row items-center w-[60%]">
		<NumberInput size="xs" placeholder="-" disabled={!checked} bind:value={inputs[0]} />
		<NumberInput size="xs" placeholder="-" disabled={!checked} bind:value={inputs[1]} />
		<NumberInput size="xs" placeholder="-" disabled={!checked} bind:value={inputs[2]} />
	</div>
</div>
