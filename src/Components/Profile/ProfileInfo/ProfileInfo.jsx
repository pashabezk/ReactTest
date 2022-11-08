import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import ProfileDataForm from "./ProfileDataForm";

const Contact = ({contactTitle, contactValue}) => {
	return (
		<div className={s.contact}>
			<b>{contactTitle}: </b>{contactValue}
		</div>
	);
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
	return (
		<div>
			{
				isOwner &&
				<div>
					<button onClick={goToEditMode}>edit</button>
				</div>
			}
			<div>
				<b>Fullname:</b> {profile.fullName}
			</div>
			<div>
				<b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
			</div>
			{
				profile.lookingForAJob &&
				<div>
					<b>My professional skills:</b> {profile.lookingForAJobDescription}
				</div>
			}
			<div>
				<b>About me:</b> {profile.aboutMe}
			</div>
			<div>
				<b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
				return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
			})}
			</div>
		</div>
	);
}

const ProfileInfo = (props) => {

	let [editMode, setEditMode] = useState(false);

	const onMainPhotoSelected = (e) => {
		if (e.target.files[0]) {
			props.savePhoto(e.target.files[0]);
		}
	}

	const onSubmit = (formData) => {
		props.saveProfile(formData).then(() => {
			setEditMode(false);
		});
	}

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
					 src={props.profile.photos.large || userPhoto}
					 alt={"user ava"}/>
				{
					props.isOwner &&
					<input type="file" onChange={onMainPhotoSelected}/>
				}
				{
					editMode
						? <ProfileDataForm initialValues={props.profile}
										   onSubmit={onSubmit}/>
						: <ProfileData profile={props.profile}
									   isOwner={props.isOwner}
									   goToEditMode={() => {
										   setEditMode(true)
									   }}/>
				}
				<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
			</div>
		</div>
	);
}

export default ProfileInfo;