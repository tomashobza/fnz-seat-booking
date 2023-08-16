<script lang="ts">
	import '../app.css';
	import { initFirebase } from '$lib/firebase';
	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	onMount(initFirebase);
</script>

<Toaster />
<slot />
