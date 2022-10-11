import { createContext, useCallback, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const provider = new GoogleAuthProvider();

	const googleSignIn = useCallback(async () => {
		try {
			await signInWithPopup(auth, provider);
		} catch (err) {
			console.log(err);
			return;
		}
	}, [auth?.currentUser]);

	const googleLogOut = useCallback(async () => {
		signOut(auth)
			.then(() => {
				setUser({});
			})
			.then((err) => console.log(err));
	}, [auth?.user]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser({ ...user });
			console.log("user", user);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				setIsLoading,
				googleSignIn,
				googleLogOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
