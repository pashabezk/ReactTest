import {follow, setCurrentPage, unfollow, toggleFollowingProgress, requestUsers} from "../../redux/users-reducer";
import {connect} from "react-redux";
import React from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize);

		// this.props.toggleIsFetching(true);
		//
		// usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
		// 	.then(data => {
		// 		this.props.setUsers(data.items);
		// 		this.props.setTotalUsersCount(data.totalCount);
		// 		this.props.toggleIsFetching(false);
		// 	});
	}

	onPageChanged = (page) => {
		this.props.getUsers(page, this.props.pageSize);
		// this.props.setCurrentPage(page);
	}

	render() {
		return (
			<>
				{this.props.isFetching ? <Preloader/> : null}
				<Users totalUsersCount={this.props.totalUsersCount}
					   pageSize={this.props.pageSize}
					   currentPage={this.props.currentPage}
					   onPageChanged={this.onPageChanged}
					   users={this.props.users}
					   follow={this.props.follow}
					   unfollow={this.props.unfollow}
					   followingInProgress={this.props.followingInProgress}
				/>
			</>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}

// let mapDispatchToProps = (dispatch) => {
// 	return {
// 		follow: (userId) => {
// 			dispatch(followAC(userId));
// 		},
// 		unfollow: (userId) => {
// 			dispatch(unfollowAC(userId));
// 		},
// 		setUsers: (users) => {
// 			dispatch(setUsersAC(users));
// 		},
// 		setCurrentPage: (pageNumber) => {
// 			dispatch(setCurrentPageAC(pageNumber));
// 		},
// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setUsersTotalCountAC(totalCount));
// 		},
// 		toggleIsFetching: (isFetching) => {
// 			dispatch(toggleIsFetchingAC(isFetching));
// 		}
// 	}
// }

let mapDispatchToProps = {
	follow, unfollow,
	setCurrentPage, toggleFollowingProgress,
	getUsers: requestUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)