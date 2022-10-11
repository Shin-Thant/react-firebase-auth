import "../App.css";
import React, { useState } from "react";
import SignIn from "./auth/SignIn";
import Login from "./auth/Login";

const Auth = () => {
	const [tab, setTab] = useState("signin");

	const changeTab = (tab) => {
		setTab(tab);
	};

	return (
		<div className="auth">
			<div className="auth__container">
				<div className="auth__tab__container">
					<div
						onClick={() => changeTab("signin")}
						className={`auth__tab ${
							tab === "signin" ? "auth__tab--active" : ""
						}`}
					>
						Sign In
					</div>
					<div
						onClick={() => changeTab("login")}
						className={`auth__tab ${
							tab === "login" ? "auth__tab--active" : ""
						}`}
					>
						Login
					</div>
				</div>

				<div className="auth__container__content">
					{tab === "signin" ? (
						<SignIn authName={"Sign In"} />
					) : (
						<Login authName={"LogIn"} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Auth;
