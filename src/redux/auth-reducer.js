import {authAPI, securityAPI} from "../API/API";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null // if null, then captcha isn't required
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload
			};
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				captchaUrl: action.payload.url
			};

		default:
			return state;
	}
}

// action creators
export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}});
export const getCaptchaUrlSuccess = (url) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {url}});

// работа с thunk
export const getAuthUserData = () => {
	return async (dispatch) => {
		let response = await authAPI.me();

		if (response.data.resultCode === 0) {
			let {id, email, login} = response.data.data;
			dispatch(setAuthUserData(id, email, login, true));
		}
	}
}

export const login = (email, password, rememberMe, captcha) => {
	return async (dispatch) => {
		let response = await authAPI.login(email, password, rememberMe, captcha);
		if (response.data.resultCode === 0) {
			dispatch(getAuthUserData());
		} else {
			if (response.data.resultCode === 10) {
				dispatch(getCaptchaURL());
			}
			const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
			dispatch(stopSubmit("login", {_error: message}));
		}
	}
}

export const logout = () => {
	return async (dispatch) => {
		let response = await authAPI.logout();
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false));
		}
	}
}

export const getCaptchaURL = () => async (dispatch) => {
	const response = await securityAPI.getCaptchaURL();
	dispatch(getCaptchaUrlSuccess(response.data.url));
}

export default authReducer;