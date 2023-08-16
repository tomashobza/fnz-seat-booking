import { writable } from 'svelte/store';

export const user = writable<any>(null);
export const preference = writable<{
	monday: number[];
	tuesday: number[];
	wednesday: number[];
	thursday: number[];
	friday: number[];
}>({
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: []
});
