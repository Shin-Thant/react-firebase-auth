import React, { useCallback, useState } from "react";
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";

const WithAuth = (Original) => {
	function WrappedWithAuth({ authName }) {
		// states
		const [email, setEmail] = useState("");
		const [password, setPassword] = useState("");
		const { setIsLoading } = useAuth();
		const navigate = useNavigate();

		// providers
		const provider = new GoogleAuthProvider();
		const fbProvider = new FacebookAuthProvider();

		// event handlers
		const handleEmail = (e) => {
			setEmail(e.target.value);
		};

		const handlePwd = (e) => {
			setPassword(e.target.value);
		};

		const resetData = useCallback(() => {
			setEmail("");
			setPassword("");
		}, []);

		// authenticate with google
		const authWithGoogle = async () => {
			try {
				await signInWithPopup(auth, provider);

				// setIsLoading(true);
				// setTimeout(() => {
				// 	setIsLoading(false);
				// }, 5000);
				navigate("..", { replace: true });
			} catch (err) {
				console.log(err);
			}
		};

		// authenticate with facebook
		const authWithFacebook = async () => {
			try {
				await signInWithPopup(auth, fbProvider);

				// setIsLoading(true);
				// setTimeout(() => {
				// 	setIsLoading(false);
				// }, 5000);
				navigate("..", { replace: true });
			} catch (err) {
				console.log(err);
			}
		};

		return (
			<>
				<h2 className="auth__container__heading">
					{authName} with Email
				</h2>

				<Original
					email={email}
					password={password}
					resetData={resetData}
				>
					<div className="form__field">
						<label htmlFor="email" className="form__field__label">
							Email
						</label>
						<input
							value={email}
							onChange={handleEmail}
							id="email"
							className="form__field__input"
							type="email"
							required
						/>
					</div>

					<div className="form__field">
						<label
							htmlFor="password"
							className="form__field__label"
						>
							Password
						</label>
						<input
							value={password}
							onChange={handlePwd}
							id="password"
							className="form__field__input"
							type="password"
							required
						/>
					</div>

					<button type="submit" className="form__btn auth__btn">
						{authName}
					</button>
				</Original>

				<div className="auth__gap">
					<span>OR</span>
				</div>

				<button className="auth__btn" onClick={authWithGoogle}>
					{authName} With Google
				</button>

				<button className="auth__btn" onClick={authWithFacebook}>
					{authName} With Facebook
				</button>
			</>
		);
	}

	return WrappedWithAuth;
};

export default WithAuth;
