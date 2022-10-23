import React from "react";
import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png'
import {NavLink} from "react-router-dom";
import Preloader from "../Common/Preloader/Preloader";

let Users = (props) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
		if (pages.length > 10)
			break;
	}
	pages.push(pagesCount - 2);
	pages.push(pagesCount - 1);
	pages.push(pagesCount);

	return (
		<div>
			<div>
				{
					pages.map(p => {
						return <span key={p+"page"}
									 className={styles.pageNumber + " " + (props.currentPage === p ? styles.selectedPage : "")}
									 onClick={(e) => {
										 props.onPageChanged(p);
									 }}>
							{p}
						</span>
					})
				}
			</div>
			{
				props.users.map(u => {
					return (
						<div key={u.id}>
							<span>
								<div>
									<NavLink to={"/profile/" + u.id}>
										<img className={styles.userPhoto} alt="user"
											 src={u.photos.small != null ? u.photos.small : userPhoto}/>
									</NavLink>
								</div>
								<div>
									{
										u.followed
											? <button disabled={props.followingInProgress.some(id => id === u.id)}
													  onClick={() => {
														  props.unfollow(u.id)
													  }}>Unfollow
											</button>
											: <button disabled={props.followingInProgress.some(id => id === u.id)}
													  onClick={() => {
														  props.follow(u.id)
													  }}>Follow
											</button>
									}
									{
										props.followingInProgress.some(id => id === u.id)
											? <Preloader size="20px"/> : null
									}
								</div>
							</span>
							<span>
								<span>
									<div>{u.name}</div>
									<div>{u.status}</div>
								</span>
								<span>
									<div>{"u.location.country"}</div>
									<div>{"u.location.city"}</div>
								</span>
							</span>
						</div>
					);
				})
			}
		</div>
	);
}

export default Users;