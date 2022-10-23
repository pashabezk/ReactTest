import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
	return <nav className={s.nav}>
		<div className={s.item}>
			<NavLink to="/profile" className={(navData) => navData.isActive ? s.active : ''}>Profile</NavLink>
		</div>
		<div className={`${s.item}`}>
			<NavLink to="/dialogs/" className={(navData) => navData.isActive ? s.active : ''}>Dialogs</NavLink>
		</div>
		<div className={`${s.item}`}>
			<NavLink to="/users" className={(navData) => navData.isActive ? s.active : ''}>Users</NavLink>
		</div>
		<div className={s.item}>
			<NavLink to="/news" className={(navData) => navData.isActive ? s.active : ''}>News</NavLink>
		</div>
		<div className={s.item}>
			<p>Music</p>
		</div>
		<div className={s.item}>
			<p>Settings</p>
		</div>
	</nav>
}

export default Navbar;