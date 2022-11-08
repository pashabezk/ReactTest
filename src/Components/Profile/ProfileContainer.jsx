import React from 'react';
import Profile from "./Profile";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {connect} from "react-redux";
import {useParams} from 'react-router-dom';
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";

export function withRouter(Children) {
	return (props) => {
		const match = {params: useParams()};
		if (!match.params.userId)
			match.params.userId = props.userId;

		return <Children {...props} match={match}/>
	}
}

class ProfileContainer extends React.Component {

	refreshProfile() {
		let userId = this.props.match.params.userId;
		this.props.getUserProfile(userId);
		this.props.getStatus(userId);
	}

	componentDidMount() {
		this.refreshProfile();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId !== prevProps.match.params.userId)
			this.refreshProfile();
	}

	render() {
		return (
			<Profile {...this.props}
					 profile={this.props.profile}
					 isOwner={!!this.props.match.params.userId}
					 status={this.props.status}
					 updateStatus={this.props.updateStatus}
					 savePhoto={this.props.savePhoto}
			/>
		);
	}
}

let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	userId: state.auth.userId,
	isAuth: state.auth.isAuth
});

let dispatchProps = {
	getUserProfile,
	getStatus,
	updateStatus,
	savePhoto,
	saveProfile
}

export default compose(
	connect(mapStateToProps, dispatchProps),
	withRouter,
	withAuthRedirect
)(ProfileContainer);