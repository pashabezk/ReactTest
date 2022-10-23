import React from "react";
import s from "./News.module.css"
import NewsPost from "./NewsPost/NewsPost";

const News = (props) => {
	let newPostElement = React.createRef();

	let onChangeTextareaPost = () => {
		let text = newPostElement.current.value;
		props.updatePostText(text);
	};

	let onAddButtonClick = () => {
		props.addPost();
	};

	let newsPostsElements = props.posts.map(p=><NewsPost key={p.id} author={p.author} text={p.text}/>);

	return (
		<div className={s.news_container}>
			<div className={s.new_post_container}>
				<textarea value={props.newPostText} placeholder='Что нового?' ref={newPostElement}  onChange={onChangeTextareaPost}></textarea>
				<button onClick={onAddButtonClick}>Отправить</button>
			</div>
			{newsPostsElements}
		</div>
	);
}

export default News;