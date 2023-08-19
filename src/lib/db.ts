import { toast } from 'svelte-french-toast';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { get } from 'svelte/store';
import {
	seats,
	friday,
	monday,
	seat_number,
	thursday,
	tuesday,
	user,
	user_has_seat,
	wednesday,
	week_seats
} from './stores';
import { db } from './firebase';
import { days_of_week_lc } from './constants';

export const get_users_preference = async () => {
	if (!get(user).uid) return;
	const docRef = doc(db, 'preferences', get(user).uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// console.log('Document data:', docSnap.data());
		const db_data: any = docSnap.data();

		db_data?.monday && monday.set(db_data.monday);
		db_data?.tuesday && tuesday.set(db_data.tuesday);
		db_data?.wednesday && wednesday.set(db_data.wednesday);
		db_data?.thursday && thursday.set(db_data.thursday);
		db_data?.friday && friday.set(db_data.friday);
	} else {
		// docSnap.data() will be undefined in this case
		// console.log('No such document!');
	}
};

export const get_users_seat = async () => {
	const docRef = doc(db, 'seatAssignments', 'current');
	const docSnap = await getDoc(docRef);
	const d = new Date();
	const day = days_of_week_lc[d.getDay() - 1];

	console.log(docSnap.exists());

	if (docSnap.exists()) {
		// console.log('Document data:', docSnap.data());
		const db_data = docSnap.data();

		week_seats.set(
			Object.keys(db_data).map((key) => {
				let st = null;
				Object.keys(db_data[key]).forEach((seat) => {
					if (db_data[key][seat] == get(user).uid) {
						st = seat;
					}
				});
				return st;
			})
		);

		if (!db_data[day]) return;
		let seat: null | number = null;

		Object.keys(db_data[day]).forEach((key) => {
			if (db_data[day][key] == get(user).uid) {
				seat = parseInt(key);
			}
		});
		if (seat) {
			seat_number.set(seat);
			user_has_seat.set(true);
		} else {
			user_has_seat.set(false);
		}

		// console.log(
		// 	Object.keys(db_data[day]).map((key) => {
		// 		return db_data[day][key] == null ? key : null;
		// 	})
		// );

		seats.set(db_data[day]);
	} else {
		toast.error('There are no assignments yet. 😿');
	}
};

export const grab_a_seat = async (seat_num: number | null) => {
	if (!seat_num) return;

	seats.update((v) => {
		v[seat_num] = get(user).uid;
		return v;
	});

	const d = new Date();
	const day = days_of_week_lc[d.getDay() - 1];

	const update = {};
	update[day] = get(seats);
	update[day][`${seat_num}`] = get(user).uid;

	await get_users_seat();
	if (get(seats)[`${seat_num}`] != null && get(seats)[`${seat_num}`] != get(user).uid) {
		toast.error('Somebody was faster. 😿');
		return;
	}

	updateDoc(doc(db, 'seatAssignments', 'current'), update)
		.then(() => {
			toast.success('Seat grabbed successfully!');
			user_has_seat.set(true);
			seat_number.set(seat_num);
		})
		.catch(() => toast.error('Something went wrong. 😿'));
};

export const free_a_seat = (seat_num: number | null) => {
	if (!seat_num) return;

	seats.update((v) => {
		v[seat_num] = get(user).uid;
		return v;
	});

	const d = new Date();
	const day = days_of_week_lc[d.getDay() - 1];

	const update = {};
	update[day] = get(seats);
	update[day][`${seat_num}`] = null;

	updateDoc(doc(db, 'seatAssignments', 'current'), update)
		.then(async () => {
			toast.success('Seat freed successfully!');
			user_has_seat.set(false);
			seat_number.set(null);
		})
		.catch(() => toast.error('Something went wrong. 😿'));
};
