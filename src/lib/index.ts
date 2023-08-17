import { get } from 'svelte/store';
import { preferences, user } from './stores';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import toast from 'svelte-french-toast';

export const save_preferences = () => {
	const preferences_to_save = get(preferences);

	// check choice validity
	let valid = true;
	Object.keys(preferences_to_save).forEach((key) => {
		valid = valid && !preferences_to_save[key].find((v) => v < 0 || v > 93);
	});
	if (!valid) {
		toast.error('Incorrect seat number. 😿');
		return null;
	}

	return setDoc(doc(db, 'preferences', get(user).uid), preferences_to_save);
};
