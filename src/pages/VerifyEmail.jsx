import {
	onAuthStateChanged,
	reauthenticateWithPopup,
	sendEmailVerification,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const VerifyEmail = () => {
	const [sending, setSending] = useState(false);
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	async function verify() {
		try {
			console.log(auth.currentUser);
			await sendEmailVerification(auth.currentUser);
		} catch (err) {
			console.log(err);
		}
	}

	// just test
	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			verify();
		}

		return () => {
			isMounted = false;
		};
	}, []);

	if (loading) return <h4>loading...</h4>;

	if (!user) {
		return <Navigate to="../auth" replace={true} />;
	}

	if (user?.emailVerified) return <Navigate to=".." replace={true} />;

	return (
		<div className="verify">
			<div className="verify__content">
				<h2>We need to verify your email!</h2>

				{/* <button onClick={verify}>Send Me an email!</button> */}

				<div>
					click this link after verified -
					<span
						style={{
							color: "blue",
							cursor: "pointer",
						}}
						onClick={() => window.location.reload()}
					>
						Reload
					</span>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmail;
