<script lang="ts">
	import { scale } from 'svelte/transition';
	import { grab_a_seat } from './db';
	import { seats } from './stores';

	$: free_seats = Object.keys($seats)
		.map((key) => {
			return $seats[key] == null ? key : null;
		})
		.filter((v) => v);
</script>

<div class="flex flex-row flex-wrap gap-4 justify-center h-full w-full overflow-auto py-2">
	<!-- a -->
	{#each free_seats as seat (seat)}
		<button
			class="bg-blue-500 font-bold bg-opacity-30 rounded-lg grid place-content-center w-[5rem] h-[5rem] text-3xl md:text-5xl transition-all hover:scale-105 active:scale-95 active:bg-[#274b89]"
			on:click={() => grab_a_seat(parseInt(seat ?? ''))}
			out:scale={{ duration: 500, start: 0.8 }}
		>
			{seat}
		</button>
	{/each}
</div>
