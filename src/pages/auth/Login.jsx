import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import WithAuth from "./WithAuth";

const Login = ({ email, password, resetData, children }) => {
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		// login
		if (email?.length && password?.length) {
			try {
				await signInWithEmailAndPassword(auth, email, password);

				resetData();
				navigate("../verify", { replace: true });
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				autoComplete="off"
				className="auth__form"
			>
				{children}
			</form>
		</>
	);
};

export default WithAuth(Login);
