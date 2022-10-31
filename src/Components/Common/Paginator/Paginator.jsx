import React from "react";
import styles from './Paginator.module.css';

let Paginator = (props) => {
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
			{
				pages.map(p => {
					return <span key={p + "page"}
								 className={styles.pageNumber + " " + (props.currentPage === p ? styles.selectedPage : "")}
								 onClick={(e) => {
									 props.onPageChanged(p);
								 }}>
							{p}
						</span>
				})
			}
		</div>
	);
}

export default Paginator;