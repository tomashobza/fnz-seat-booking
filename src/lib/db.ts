import { toast } from 'svelte-french-toast';
import { doc, getDoc } from 'firebase/firestore';
import { get } from 'svelte/store';
import {
	friday,
	monday,
	seat_number,
	thursday,
	tuesday,
	user,
	user_has_seat,
	wednesday
} from './stores';
import { db } from './firebase';

const days_of_week = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

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
	const day = days_of_week[d.getDay() - 1];

	console.log(docSnap.exists());

	if (docSnap.exists()) {
		console.log('Document data:', docSnap.data());
		const db_data = docSnap.data();
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
	} else {
		toast.error('There are no assignments yet. 😿');
	}
};
