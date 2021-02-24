import React from "react";
import axios from "axios";

function UsePostes({ query, pageNumber }) {
	useEffect(() => {
		axios({
			method: "GET",
			url:
				"https://firestore.googleapis.com/v1/projects/enset-social-club/databases/(default)/documents/postes",
			params: { q: query, page: pageNumber },
		}).then((res) => {
			console.log(res.data());
		});
	}, [query, pageNumber]);
	return null;
}

export default UsePostes;
