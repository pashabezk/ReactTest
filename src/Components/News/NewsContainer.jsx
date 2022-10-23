// import React from "react";
import {addNewsPost, updateNewNewsPostText} from "../../redux/news-reducer";
import News from "./News";
import {connect} from "react-redux";

// const NewsContainer = (props) => {
// 	return (
// 		<StoreContext.Consumer>
// 			{
// 				(store) => {
// 					let state = store.getState();
//
// 					let updatePostText = (text) => {
// 						store.dispatch(updateNewNewsPostText(text));
// 					};
//
// 					let addPost = () => {
// 						store.dispatch(addNewsPost());
// 					};
//
// 					return <News newPostText={state.newsPage.newPostText} posts={state.newsPage.posts} updatePostText={updatePostText} addPost={addPost}/>
// 				}
// 			}
// 		</StoreContext.Consumer>
// 	);
// }

const mapStateToProps = (state) => ({
	posts: state.newsPage.posts,
	newPostText: state.newsPage.newPostText
});

const mapDispatchToProps = (dispatch) => ({
	updatePostText: (text) => {
		dispatch(updateNewNewsPostText(text));
	},
	addPost: () => {
		dispatch(addNewsPost());
	}
});

const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(News);

export default NewsContainer;