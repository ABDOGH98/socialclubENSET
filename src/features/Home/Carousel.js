import React from "react";


import one from "./img_home/1.jpg";

function Carousel() {
	return (
		<div>
			<div className="Carousel__img">
				<img src={one} alt="first" />
			</div>
		</div>
	);
}

export default Carousel;
