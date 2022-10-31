import {profileAPI} from "../API/API";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
	posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It\'s my first post', likesCount: 11},
		{id: 3, message: 'Blabla', likesCount: 11},
		{id: 4, message: 'Dada', likesCount: 11}
	],
	profile: null,
	status: ""
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 5,
				message: action.newPostText,
				likesCount: 0
			};
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: ''
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			};
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status
			};
		}
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.postId)
			};
		}
		default:
			return state;
	}
}


// action creators
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

// работа с thunk
export const getUserProfile = (userId) => {
	return async (dispatch) => {
		const response = await profileAPI.getProfile(userId);
		dispatch(setUserProfile(response.data));
	};
}

export const getStatus = (status) => {
	return async (dispatch) => {
		const response = await profileAPI.getStatus(status)
		dispatch(setStatus(response.data));
	};
}

export const updateStatus = (status) => {
	return async (dispatch) => {
		const response = await profileAPI.setStatus(status)
		if (response.data.resultCode === 0)
			dispatch(setStatus(status));
	};
}

export default profileReducer;