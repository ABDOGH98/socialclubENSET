import React, { useEffect, useState } from "react";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import firebaseConfig from "../../firebase";
import { Mail, Lock } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../social/userSlice";

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [inputError, setInputError] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const auth = firebaseConfig.auth();
	const db = firebaseConfig.firestore();

	const dispatch = useDispatch();
	const connectionState = useSelector((state) => state.user.connectionState);
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	const btnStatue = Boolean(email) && Boolean(password.length >= 6);
	const btnClickSignInHandler = (e) => {
		e.preventDefault();
		console.log("test");
		if (email && password) {
			auth
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					setEmail("");
					setPassword("");
					console.log("gg");
				})
				.catch((e) => setInputError(e.message));
		}
	};
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection("students")
					.doc(user.uid)
					.get()
					.then((doc) => {
						if (connectionState === false) {
							setFirstName(doc.data().firstname);
							setLastName(doc.data().lastname);
							dispatch(
								userLogin({
									connectionState: true,
									idUser: user.uid,
									firstName,
									lastName,
								}),
							);
							return;
						}
					});
			}
		});
	}, [auth, connectionState, db, dispatch, firstName, lastName]);
	return (
		<form>
			{inputError.length > 0 && (
				<Alert variant="outlined" severity="error">
					{inputError}
				</Alert>
			)}
			<TextField
				className="signin__inputMail"
				label="Enter your email"
				type="email"
				onChange={handleEmail}
				value={email}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Mail />
						</InputAdornment>
					),
				}}
			/>
			<TextField
				className="signin__inputMail"
				label="Enter your password"
				type="password"
				onChange={handlePassword}
				value={password}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Lock />
						</InputAdornment>
					),
				}}
			/>

			<Button
				onClick={btnClickSignInHandler}
				className="signin__btn"
				variant="contained"
				color="primary"
				type="submit"
				disabled={!btnStatue}
			>
				Connect
			</Button>
		</form>
	);
}

export default SignIn;
