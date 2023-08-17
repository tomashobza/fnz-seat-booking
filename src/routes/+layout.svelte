<script lang="ts">
	import '../app.css';
	import { initFirebase } from '$lib/firebase';
	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { get_users_seat } from '$lib/db';
	onMount(() => {
		initFirebase();
		get_users_seat();
	});
</script>

<svelte:head>
	<title>FNZ - Seat Booking</title>
</svelte:head>

<Toaster />
<slot />
