import React from "react";
import s from "./NewsPost.module.css"

const NewsPost = (props) => {
	return (
		<div className={s.news_note}>
			<h3>{props.author}</h3>
			<p>{props.text}</p>
		</div>
	);
}

export default NewsPost;