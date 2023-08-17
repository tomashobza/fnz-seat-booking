<script>
	import ArrowUp from '$lib/ArrowUp.svelte';
	import Preferences from '$lib/Preferences.svelte';
	import { auth } from '$lib/firebase';
	import { login, logout } from '$lib/login';
	import { seat_number, user } from '$lib/stores';
	import { SvelteUIProvider } from '@svelteuidev/core';
	import { Button } from '@svelteuidev/core';

	const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const d = new Date();
	const day = weekday[d.getDay()];

	let drawer_open = false;

	const loginHandler = async () => {
		await login();
	};
</script>

<div class="h-full text-white flex flex-col items-stretch bg-slate-900 p-4 gap-4">
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
			<div class="text-2xl md:text-4xl font-light leading-[3rem] flex flex-col items-center gap-2">
				<div class="text-center">Your seat for {day}:</div>
				<div class="bg-blue-500 font-bold bg-opacity-30 rounded-lg px-3 py-2 text-3xl md:text-5xl">
					{$seat_number ?? '--    '}
				</div>
			</div>
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
