import React from "react";

import Navbar from "./Navbar";
import "./social.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import InputPoste from './InputPoste'
import Poste from './Poste'
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Social() {
	return (
		<div>
			<Navbar />
			<InputPoste />
			<Poste/>
		</div>
	);
}

export default Social;
