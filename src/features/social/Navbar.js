import { Avatar, IconButton } from "@material-ui/core";
import Bookmark from "@material-ui/icons/Bookmark";
import React from "react";
import firebaseConfig from "../../firebase";
import { useDispatch } from "react-redux";
import { userLogin } from "../social/userSlice";

import logo from "../img/logo.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MessageIcon from "@material-ui/icons/Message";

function Navbar() {
	const auth = firebaseConfig.auth();
	const dispatch = useDispatch();

	const logOut = () => {
		auth.signOut().then(() => {
			dispatch(
				userLogin({
					connectionState: false,
					idUser: null,
					firstName: null,
					lastname: null,
				}),
			);
		});
	};
	return (
		<div className="navBar">
			<div className="navbar__start">
				<img src={logo} alt="logo" width="100px" />
			</div>

			<div className="navbar__middle">
				<IconButton aria-label="calander">
					<CalendarTodayIcon fontSize="large" />
				</IconButton>

				<IconButton aria-label="interested">
					<Bookmark fontSize="large" />
				</IconButton>

				<IconButton aria-label="message">
					<MessageIcon fontSize="large" />
				</IconButton>
			</div>

			<div className="navbar__end">
				<Avatar alt="Abdessamd Sharp" src="/static/images/avatar/1.jpg" />

				<IconButton aria-label="logout" onClick={logOut}>
					<ExitToAppIcon fontSize="large" />
				</IconButton>
			</div>
		</div>
	);
}

export default Navbar;
