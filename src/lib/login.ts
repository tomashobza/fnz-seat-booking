import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import toast from 'svelte-french-toast';
import { auth, provider } from './firebase';
import { user } from './stores';

export const login = () => {
	return new Promise((res, rej) => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				// const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential?.accessToken;
				// // The signed-in user info.
				// const user = result.user;
				// IdP data available using getAdditionalUserInfo(result)
				// ...
				toast.success("You're logged in!");
				user.set(result.user);
				res(result);
			})
			.catch((error) => {
				toast.error('Something went wrong. 😿');
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
				rej(error);
			});
	});
};

export const logout = () => {
	signOut(auth)
		.then(() => {
			user.set(null);
			toast.success("You're signed out!");
		})
		.catch((error) => {
			toast.error('Something went wrong. 😿');
		});
};
