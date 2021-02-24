import { Tab } from "bootstrap";
import React from "react";
import { Tabs } from "react-bootstrap";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Form() {
	return (
		<div className="form__div">
			<Tabs defaultActiveKey="Registration" id="uncontrolled-tab-example">
				<Tab
					className="form_firstTab"
					eventKey="Registration"
					title="Registration"
				>
					<SignUp />
				</Tab>
				<Tab className="form_secondTab" eventKey="SignIn" title="Log In">
					<SignIn />
				</Tab>
			</Tabs>
		</div>
	);
}

export default Form;
