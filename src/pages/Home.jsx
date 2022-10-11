import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Home = () => {
	// todo: if you handle user state manually, you have to add loading time for getting the user data
	// const { user: current, isLoading } = useAuth();

	const [user, loading] = useAuthState(auth);
	// const { googleLogOut } = useAuth();
	const navigate = useNavigate();

	const handleLogOut = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			console.log(err);
		}
		navigate("auth", { replace: true });
	};

	// * uncomment when you want to handle manually user state
	// if (isLoading) return <h3>Loading...</h3>;
	// if (!current?.email) return <Navigate to="/auth" replace={true} />;

	if (loading) return <h3>Loading...</h3>;

	if (!user) return <Navigate to={"/auth"} replace={true} />;

	if (!user?.emailVerified) return <Navigate to={"/verify"} replace={true} />;

	return (
		<div className="app">
			<h1>Welcome</h1>

			{user?.displayName?.length ? (
				<ul style={{ padding: "1rem 1rem 1rem 2rem" }}>
					<li>{user?.displayName}</li>
					<li>{user?.email}</li>
				</ul>
			) : (
				""
			)}

			<button onClick={handleLogOut}>Logout</button>
		</div>
	);
};

export default Home;
