import React from "react";
import Carousel from "./Carousel";

import Form from "./Form";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Home() {
	return (
		<>
			<Carousel />
			<Form />
		</>
	);
}

export default Home;
