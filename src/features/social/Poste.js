import { Card, Col, Row, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import firebaseConfig from "../../firebase";
import { parseISO, formatDistanceToNow } from "date-fns";
import { Skeleton } from "@material-ui/lab";
import InfiniteScroll from "react-infinite-scroll-component";

function Poste() {
	const db = firebaseConfig.firestore();

	const query = db.collection("postes").orderBy("date", "desc").limit(3);

	const [lastVisible, setlastVisible] = useState(0);
	const [postes, setPostes] = useState([]);
	const [loading, setLoading] = useState(true);

	const [posteLenght, setPosteLenght] = useState(0);

	const getMore = () => {
		setLoading(true);
		query.startAfter(lastVisible).onSnapshot((data) => {
			updateState(data);
			setLoading(false);
		});
	};
	const updateState = (data) => {
		if (data.size > 0) {
			console.log("gg");
			const newData = data.docs.map((doc) => doc.data());
			setPostes((postes) => [...postes, ...newData]);
			setlastVisible(data.docs[data.docs.length - 1]);
			setPosteLenght(posteLenght + 3);
		}
	};

	useEffect(() => {
		setLoading(true);
		query.onSnapshot((data) => {
			setlastVisible(data.docs[data.docs.length - 1]);
			setPostes(data.docs.map((doc) => doc.data()));
		});
		setLoading(false);
	}, []);

	let timeAgo = "";
	const content = postes.map((poste) => {
		const date = parseISO(poste.date);
		const timePeriod = formatDistanceToNow(date);
		timeAgo = `${timePeriod} ago`;
		return (
			<Row className="poste">
				<Col
					lg={{ span: 6, offset: 3 }}
					md={{ span: 8, offset: 2 }}
					sm={{ span: 10, offset: 1 }}
					xs={12}
					className="px-0"
				>
					<Card className="inputposte__card ">
						<div className="poste__profile">
							<div>
								<Avatar
									alt={poste.user.firstName + " " + poste.user.lastName}
									src="/static/images/avatar/1.jpg"
								/>
							</div>
							<div className="mx-2">
								<div>
									<span>{poste.user.firstName}</span>
								</div>
								<div>
									<small>
										<i>{timeAgo}</i>
									</small>
								</div>
							</div>
							<br />
						</div>
						<div className="poste__header">{poste.description}</div>
						<div className="inputposte__img">
							<img src={poste.img_url} alt="" />
						</div>
						<div className="poste__footer">
							<Button
								variant="contained"
								color="default"
								startIcon={<StarBorderIcon />}
							>
								Interested
							</Button>
						</div>
					</Card>
				</Col>
			</Row>
		);
	});
	if (lastVisible === null) {
		return (
			<Container>
				<Row className="poste">
					<Col
						lg={{ span: 6, offset: 3 }}
						md={{ span: 8, offset: 2 }}
						sm={{ span: 10, offset: 1 }}
						xs={12}
						className="px-0"
					>
						<div className="my-3">
							<Skeleton variant="circle" width={40} height={40} />
							<Skeleton variant="text" />
							<Skeleton variant="text" />
							<Skeleton variant="rect" width={210} height={118} />
							<Skeleton variant="text" />
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
	return (
		<Container>
			<InfiniteScroll
				className="infinityWidth"
				dataLength={posteLenght}
				next={getMore}
				hasMore={true}
			>
				{content}

				{loading && (
					<Row className="poste">
						<Col
							lg={{ span: 6, offset: 3 }}
							md={{ span: 8, offset: 2 }}
							sm={{ span: 10, offset: 1 }}
							xs={12}
							className="px-0"
						>
							<div className="my-3">
								<Skeleton variant="circle" width={40} height={40} />
								<Skeleton variant="text" />
								<Skeleton variant="text" />
								<Skeleton variant="rect" width={210} height={118} />
								<Skeleton variant="text" />
							</div>
						</Col>
					</Row>
				)}
			</InfiniteScroll>
		</Container>
	);
}

export default Poste;
