import {usersAPI} from "../API/API";

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
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return {...u, followed: true}
					}
					return u;
				})
			};

		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(u => {
					if (u.id === action.userId) {
						return {...u, followed: false}
					}
					return u;
				})
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
	return (dispatch) => {
		dispatch(toggleIsFetching(true));

		usersAPI.getUsers(page, pageSize)
			.then(data => {
				dispatch(setUsers(data.items));
				dispatch(setTotalUsersCount(data.totalCount));
				dispatch(setCurrentPage(page));
				dispatch(toggleIsFetching(false));
			});
	}
}

export const follow = (userId) => {
	return (dispatch) => {
		dispatch(toggleFollowingProgress(true, userId));
		usersAPI.follow(userId)
			.then(response => {
				if (response.data.resultCode === 0) {
					dispatch(followSuccess(userId));
				}
			})
			.finally(() => {
				dispatch(toggleFollowingProgress(false, userId));
			});
	}
}

export const unfollow = (userId) => {
	return (dispatch) => {
		dispatch(toggleFollowingProgress(true, userId));
		usersAPI.unfollow(userId)
			.then(response => {
				if (response.data.resultCode === 0) {
					dispatch(unfollowSuccess(userId));
				}
			})
			.finally(() => {
				dispatch(toggleFollowingProgress(false, userId));
			});
	}
}


export default usersReducer;