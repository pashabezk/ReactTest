import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

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
				<img className={s.ava} src={props.profile.photos.large} alt={"user ava"}/>
				<p>{props.profile.aboutMe}</p>
				<ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
			</div>
		</div>
	);
}

export default ProfileInfo;