import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
	initialized: false
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true
			};

		default:
			return state;
	}
}

// action creators
export const initializedSuccess = () => ({type: SET_INITIALIZED});

// работа с thunk
export const initializeApp = () => {
	return (dispatch) => {
		let promise = dispatch(getAuthUserData());
		promise.then(() => {
			dispatch(initializedSuccess())
		});
	}
}

export default appReducer;