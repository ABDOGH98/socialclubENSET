import React from "react";
import Home from "./features/Home/Home";
import Social from "./features/social/Social";
import { useSelector } from "react-redux";

function App() {
	const connectionState = useSelector((state) => state.user.connectionState);

	if (connectionState === true) {
		return <Social />;
	} else if (connectionState === false) return <Home />;
}

export default App;
