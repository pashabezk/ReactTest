import {profileAPI} from "../API/API";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: {...state.profile, photos: action.photos}
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
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

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
		try {
			const response = await profileAPI.setStatus(status)
			if (response.data.resultCode === 0)
				dispatch(setStatus(status));
		}
		catch (error) {
			console.log(error);
		}
	};
}

export const savePhoto = (file) => {
	return async (dispatch) => {
		const response = await profileAPI.savePhoto(file)
		if (response.data.resultCode === 0)
			dispatch(savePhotoSuccess(response.data.data.photos));
	};
}

export const saveProfile = (profile) => {
	return async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const response = await profileAPI.saveProfile(profile)
		if (response.data.resultCode === 0)
			dispatch(getUserProfile(userId));
		else {
			dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
			return Promise.reject(response.data.messages[0]);
		}
	};
}

export default profileReducer;