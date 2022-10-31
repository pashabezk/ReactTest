import {usersAPI} from "../API/API";
import {updateObjectInArray} from "../Utils/Object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';

let initialState = {
	users: [],
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
				// users: state.users.map(u => {
				// 	if (u.id === action.userId) {
				// 		return {...u, followed: true}
				// 	}
				// 	return u;
				// })
			};

		case UNFOLLOW:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
			};

		case SET_USERS:
			return {
				...state,
				users: [...action.users]
			};

		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage
			};

		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalUsers
			};


		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching
			};

		case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			};

		default:
			return state;
	}
}

// action creators
export const followSuccess = (userId) => ({type: FOLLOW, userId: userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId: userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsers) => ({type: SET_TOTAL_USERS_COUNT, totalUsers});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId});

// работа с thunk
export const requestUsers = (page, pageSize) => {
	return async (dispatch) => {
		dispatch(toggleIsFetching(true));
		let data = await usersAPI.getUsers(page, pageSize);
		dispatch(setUsers(data.items));
		dispatch(setTotalUsersCount(data.totalCount));
		dispatch(setCurrentPage(page));
		dispatch(toggleIsFetching(false));
	}
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId)
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {
	return async (dispatch) => {
		followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
	}
}

export const unfollow = (userId) => {
	return async (dispatch) => {
		followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
	}
}

export default usersReducer;