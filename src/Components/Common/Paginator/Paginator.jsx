import React, {useState} from "react";
import styles from './Paginator.module.css';

let Paginator = (props) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

	const portionSize = 10;
	const portionCount = Math.ceil(pagesCount / portionSize);
	const [portionNumber, setPortionNumber] = useState(1);
	const leftPartionPageNumber = (portionNumber - 1) * portionSize + 1;
	const rightPortionPageNumber = portionNumber * portionSize;

	let pages = [];
	for (let i = leftPartionPageNumber; i <= rightPortionPageNumber; i++) {
		pages.push(i);
		// if (pages.length > 10)
		// 	break;
	}
	// pages.push(pagesCount - 2);
	// pages.push(pagesCount - 1);
	// pages.push(pagesCount);

	return (
		<div class={styles.paginator}>
			{
				portionNumber > 1 &&
				<button onClick={() => {
					setPortionNumber(portionNumber - 1)
				}}>prev</button>
			}
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
			{
				portionCount > portionNumber &&
				<button onClick={() => {
					setPortionNumber(portionNumber + 1)
				}}>next</button>
			}
		</div>
	);
}

export default Paginator;