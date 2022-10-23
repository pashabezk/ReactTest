import preloader from "../../../assets/images/preloader.svg";
import React from "react";

let Preloader = (props) => {
	return (
		<div>
			<img src={preloader} alt={"preloader"} width={props.size} height="auto"/>
		</div>
	);
}

export default Preloader;