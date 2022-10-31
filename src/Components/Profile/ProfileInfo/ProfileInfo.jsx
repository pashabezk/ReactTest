import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";

const ProfileInfo = (props) => {

	if (!props.profile) {
		return <div><Preloader/></div>
	}

	return (
		<div>
			<div>
				<img width='600px' src='https://interier-foto.ru/wp-content/uploads/dlinnye-foto-4.jpg' alt='wp'/>
			</div>
			<div>
				<img className={s.ava}
					 src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto}
					 alt={"user ava"}/>
				<p>{props.profile.aboutMe}</p>
				<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
			</div>
		</div>
	);
}

export default ProfileInfo;