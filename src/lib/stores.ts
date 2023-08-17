import { derived, writable } from 'svelte/store';

export const user = writable<any>(null);

export const monday = writable<number[]>([]);
export const tuesday = writable<number[]>([]);
export const wednesday = writable<number[]>([]);
export const thursday = writable<number[]>([]);
export const friday = writable<number[]>([]);

export const days_stores = [monday, tuesday, wednesday, thursday, friday];

export const preferences = derived(
	[monday, tuesday, wednesday, thursday, friday],
	([$monday, $tuesday, $wednesday, $thursday, $friday]) => {
		return {
			monday: $monday.map((v) => {
				return v || null;
			}),
			tuesday: $tuesday.map((v) => {
				return v || null;
			}),
			wednesday: $wednesday.map((v) => {
				return v || null;
			}),
			thursday: $thursday.map((v) => {
				return v || null;
			}),
			friday: $friday.map((v) => {
				return v || null;
			})
		};
	}
);

export const seat_number = writable<number | null>(null);
export const user_has_seat = writable<boolean>(true);
export const seats = writable<number[]>([]);
