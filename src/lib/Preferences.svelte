<script lang="ts">
	import { onMount } from 'svelte';
	import Day from './Day.svelte';
	import { doc, getDoc, setDoc } from 'firebase/firestore';
	import { db } from './firebase';
	import { preference, user } from './stores';
	import { Button } from '@svelteuidev/core';
	import { save_preferences } from '$lib';
	import toast from 'svelte-french-toast';

	export let open: boolean = false;
	let loading = false;

	const handleSave = () => {
		loading = true;
		save_preferences()
			.then((res) => {
				console.log(res);
				toast.success('Preferences saved!');
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong. 😿');
			})
			.finally(() => {
				loading = false;
			});
	};

	onMount(async () => {
		if (!$user.uid) return;
		const docRef = doc(db, 'preferences', $user.uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data());
			const db_data: any = docSnap.data();
			preference.set(db_data);
			console.log(preference);
		} else {
			// docSnap.data() will be undefined in this case
			console.log('No such document!');
		}
	});

	$: console.log($preference);
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
