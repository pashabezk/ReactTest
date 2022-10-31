import React from "react";
import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom";
import Preloader from "../Common/Preloader/Preloader";

let User = (props) => {
	let user = props.user;
	return (
		<div>
			<span>
				<div>
					<NavLink to={"/profile/" + user.id}>
						<img className={styles.userPhoto} alt="user"
							 src={user.photos.small != null ? user.photos.small : userPhoto}/>
					</NavLink>
				</div>
				<div>
					{
						user.followed
							? <button disabled={props.followingInProgress.some(id => id === user.id)}
									  onClick={() => {
										  props.unfollow(user.id)
									  }}>Unfollow</button>
							: <button disabled={props.followingInProgress.some(id => id === user.id)}
									  onClick={() => {
										  props.follow(user.id)
									  }}>Follow</button>
					}
					{
						props.followingInProgress.some(id => id === user.id)
							? <Preloader size="20px"/> : null
					}
				</div>
			</span>
			<span>
				<span>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</span>
				<span>
					<div>{"u.location.country"}</div>
					<div>{"u.location.city"}</div>
				</span>
			</span>
		</div>
	);
}

export default User;