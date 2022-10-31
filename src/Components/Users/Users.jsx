import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {
	return (
		<div>
			<Paginator currentPage={props.currentPage}
					   onPageChanged={props.onPageChanged}
					   totalUsersCount={props.totalUsersCount}
					   pageSize={props.pageSize}
			/>
			{
				props.users.map(u => <User key={u.id}
										   user={u}
										   followingInProgress={props.followingInProgress}
										   unfollow={props.unfollow}
										   follow={props.follow}/>)
			}
		</div>
	);
}

export default Users;