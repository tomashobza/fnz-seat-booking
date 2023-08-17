import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// import { FIREBASE_API_KEY } from '$env/static/private';

import { GoogleAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth';
import { user } from './stores';
import { get_users_seat } from './db';

export const provider = new GoogleAuthProvider();

const firebaseConfig = {
	apiKey: 'AIzaSyBb3sezTOrx_iGqP_9vMErKstk5vjBx96M',
	authDomain: 'fnz-seating-plan.firebaseapp.com',
	projectId: 'fnz-seating-plan',
	storageBucket: 'fnz-seating-plan.appspot.com',
	messagingSenderId: '674456033944',
	appId: '1:674456033944:web:a54698bb645af33c180eed',
	measurementId: 'G-SPT4PRCK8B'
};

// Initialize Firebase
export let app: any;
export let analytics: any;
export let auth: any;
export let db: any;

export const initFirebase = () => {
	app = initializeApp(firebaseConfig);
	analytics = getAnalytics(app);
	auth = getAuth();

	onAuthStateChanged(auth, (current_user) => {
		if (current_user) {
			user.set(current_user);
			get_users_seat();
		} else {
			user.set(null);
		}
	});

	db = getFirestore(app);
};
