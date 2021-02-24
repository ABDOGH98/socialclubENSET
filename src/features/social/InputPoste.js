import { Button, IconButton, TextField, Tooltip } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import React, { useState } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import {
	MuiPickersUtilsProvider,
	KeyboardDateTimePicker,
} from "@material-ui/pickers";
import firebaseConfig from "../../firebase";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { v4 as uuid_v4 } from "uuid";

// import { addPoste } from "../social/posteSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	input: {
		display: "none",
	},
}));

function InputPoste() {
	const classes = useStyles();
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
	const [messageposte, setmessageposte] = useState("");
	const [file, setfile] = useState("");
	const db = firebaseConfig.firestore();
	const idUser = useSelector((state) => state.user.idUser);
	// const dispatch = useDispatch();
	const storage = firebaseConfig.storage();

	const firstName = useSelector((state) => state.user.firstName);
	const lastName = useSelector((state) => state.user.lastName);
	// console.log(userInfo);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};
	const handleMessagePost = (e) => {
		setmessageposte(e.target.value);
	};
	const handleFile = (e) => {
		setfile(e.target.files[0]);
	};
	const sendStatue =
		Boolean(messageposte !== "") &&
		Boolean(file !== "") &&
		Boolean(selectedDate !== "");
	const onBtnPosteClick = () => {
		const id = uuid_v4();

		var storageRef = storage.ref(`postesImg/${id}.jpg`).put(file);
		storageRef.on(
			"state_changed",
			null,
			(error) => console.log(error),
			() => {
				storage
					.ref("postesImg")
					.child(`${id}.jpg`)
					.getDownloadURL()
					.then((url) => {
						db.collection("postes")
							.add({
								user: { idUser, firstName, lastName },
								img_url: url,
								date: new Date().toISOString(),
								date_event: selectedDate,
								description: messageposte,
							})
							.then(() => {
								console.log("gg");
								setmessageposte("");
								setSelectedDate(new Date());
								setfile("");
								// dispatch(
								// 	addPoste(
								// 		idUser,
								// 		firstName,
								// 		lastName,
								// 		url,
								// 		new Date().toISOString(),
								// 		selectedDate,
								// 		messageposte,
								// 	),
								// );
							});
					});
			},
		);
	};

	return (
		<Container>
			<Row className="inputposte">
				<Col
					lg={{ span: 6, offset: 3 }}
					md={{ span: 8, offset: 2 }}
					sm={{ span: 10, offset: 1 }}
					xs={12}
					className="px-0"
				>
					<Card body className="inputposte__card ">
						<TextField
							className="mx-0 mb-3"
							id="outlined-textarea"
							placeholder="Enter you poste message her ..."
							multiline
							variant="outlined"
							fullWidth
							value={messageposte}
							onChange={handleMessagePost}
						/>
						<Alert
							severity="info"
							onClose={() => {
								setfile("");
							}}
							hidden={!file}
						>
							File Uploaded
						</Alert>
						<Row className="inputposte__options mb-3">
							<Col md={2} sm={2} xs={2}>
								<input
									accept="image/*"
									className={classes.input}
									id="icon-button-file"
									type="file"
									onChange={handleFile}
								/>
								<label htmlFor="icon-button-file">
									<Tooltip title="Add image" arrow>
										<IconButton
											color="primary"
											aria-label="upload picture"
											component="span"
										>
											<ImageIcon />
										</IconButton>
									</Tooltip>
								</label>
							</Col>
							<Col md={6} sm={8} xs={8}>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDateTimePicker
										value={selectedDate}
										onChange={handleDateChange}
										ampm={false}
										label="Event Date"
										minDate={new Date()}
										format="dd/MM/yyyy hh:mm "
									/>
								</MuiPickersUtilsProvider>
							</Col>
						</Row>

						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={onBtnPosteClick}
							disabled={!sendStatue}
						>
							poste
						</Button>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default InputPoste;
