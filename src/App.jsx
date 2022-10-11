import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "auth",
			element: <Auth />,
		},
		{
			path: "verify",
			element: <VerifyEmail />,
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
