<script>
	import ArrowUp from '$lib/ArrowUp.svelte';
	import FreeSeats from '$lib/FreeSeats.svelte';
	import Preferences from '$lib/Preferences.svelte';
	import { days_of_week_lc, days_of_week_uc } from '$lib/constants';
	import { free_a_seat } from '$lib/db';
	import { auth } from '$lib/firebase';
	import { login, logout } from '$lib/login';
	import { seat_number, user, user_has_seat, week_seats } from '$lib/stores';
	import { SvelteUIProvider } from '@svelteuidev/core';
	import { Button } from '@svelteuidev/core';
	import { get } from 'svelte/store';

	const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const d = new Date();
	const d_num = d.getDay();
	const day = weekday[d_num];

	let drawer_open = false;

	const loginHandler = async () => {
		await login();
	};
</script>

<div class="max-h-full h-full text-white flex flex-col items-stretch bg-slate-900 p-4 gap-4">
	{#if $user}
		<!-- HEAD -->
		<div class="self-end flex flex-row items-center justify-between w-full gap-2">
			<div class="h-6">
				Hi, {$user?.displayName ?? 'unknown'}.
			</div>
			<Button size="xs" on:click={logout}>Logout</Button>
		</div>
		<!-- MAIN -->
		<div class="flex-grow flex flex-col items-center justify-center gap-4">
			{#if $user_has_seat || false}
				<div
					class="text-2xl md:text-4xl font-light leading-[3rem] flex flex-col items-center gap-2"
				>
					<div class="text-center">Your seat for {day}:</div>
					{#if d_num < 6 || d_num > 0}
						<div
							class="bg-blue-500 font-bold bg-opacity-30 rounded-lg px-3 py-2 text-3xl md:text-5xl mb-10"
						>
							{$seat_number ?? '--'}
						</div>

						<Button
							class="self-center flex flex-row items-center gap-2 text-sm"
							on:click={() => free_a_seat(get(seat_number))}
						>
							Give it away.
						</Button>
					{:else}
						<div
							class="bg-blue-500 font-bold bg-opacity-30 rounded-lg px-3 py-2 text-3xl md:text-5xl mb-2"
						>
							{'🍻'}
						</div>
						<div class="text-sm opacity-50">Go grab a beer!</div>
					{/if}
					<div class="text-sm mt-5 mb-2">Your seats:</div>
					<div class="flex flex-row items-center justify-center gap-6 flex-wrap justify-self-end">
						{#each Array(5) as _, i}
							{#if $week_seats[i]}
								<div
									class="border px-3 py-2 rounded-lg text-xs flex flex-col items-center gap-1 w-[5rem]"
								>
									<div>{days_of_week_uc[i]}</div>
									<div class="text-base font-semibold">{$week_seats[i]}</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			{:else}
				<div class="text-center">
					You don't have a seat for {day}, but these are free:
				</div>
				<div class="w-full flex-grow relative overflow-auto">
					<div class="absolute top-0 left-0 w-full h-full">
						<FreeSeats />
					</div>
				</div>
			{/if}
		</div>
		<button
			class="self-center flex flex-row items-center gap-2"
			on:click={() => (drawer_open = !drawer_open)}
		>
			<div class="w-5 transition-all duration-300" class:rotate-180={drawer_open}>
				<ArrowUp />
			</div>
			<div>Change my preferences</div>
		</button>
		<Preferences open={drawer_open} />
	{:else}
		<div class="flex-grow flex flex-col justify-center items-center">
			<div class="text-2xl pt-8">FNZ Brno</div>
			<div class="pb-8">seat booking</div>
			<Button on:click={loginHandler}>Login</Button>
		</div>
	{/if}
</div>
