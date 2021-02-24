import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import firebaseConfig from "../../firebase";
import Alert from "@material-ui/lab/Alert";

function SingUp() {
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const [passwordConfirme, setPasswordConfirme] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [inputError, setInputError] = useState("");

	const auth = firebaseConfig.auth();
	const db = firebaseConfig.firestore();

	const handleEmail = (e) => {
		setemail(e.target.value);
	};
	const handlePassword = (e) => {
		setpassword(e.target.value);
	};
	const handlePasswordConfirme = (e) => {
		setPasswordConfirme(e.target.value);
	};
	const handleFirstName = (e) => {
		setFirstname(e.target.value);
	};
	const handleLastName = (e) => {
		setLastname(e.target.value);
	};
	const btnStatue =
		Boolean(email) &&
		Boolean(password.length >= 6) &&
		Boolean(passwordConfirme === password) &&
		Boolean(firstname) &&
		Boolean(lastname);

	const btnClickSignUpHandler = () => {
		if (email && password && passwordConfirme && firstname && lastname) {
			console.log("test");
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((user) => {
					console.log("gg");
					db.collection("students")
						.doc(user.user.uid)
						.set({
							firstname,
							lastname,
						})
						.then(() => {
							setLastname("");
							setFirstname("");
							setpassword("");
							setPasswordConfirme("");
							setemail("");
							console.log("gg");
						})
						.catch((e) => {
							console.log(e.message);
						});
				})
				.catch((e) => setInputError(e.message));
		}
	};
	return (
		<div>
			{inputError.length > 0 && (
				<Alert variant="outlined" severity="error">
					{inputError}
				</Alert>
			)}
			<TextField
				className="signin__inputMail"
				label="Enter your first name"
				onChange={handleFirstName}
				value={firstname}
				type="email"
			/>
			<TextField
				className="signin__inputMail"
				label="Enter your last name"
				onChange={handleLastName}
				value={lastname}
				type="email"
			/>
			<TextField
				className="signin__inputMail"
				label="Enter your email"
				onChange={handleEmail}
				value={email}
				type="email"
			/>
			<TextField
				className="signin__inputMail"
				label="Enter your password"
				onChange={handlePassword}
				value={password}
				type="password"
			/>
			<TextField
				className="signin__inputMail"
				label="Confirme your password "
				onChange={handlePasswordConfirme}
				value={passwordConfirme}
				type="password"
			/>
			<Button
				onClick={btnClickSignUpHandler}
				className="signin__btn"
				variant="contained"
				color="primary"
				type="submit"
				disabled={!btnStatue}
			>
				Register
			</Button>
		</div>
	);
}

export default SingUp;
