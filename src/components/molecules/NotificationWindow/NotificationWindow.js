import React, { useState } from 'react';
import styles from './NotificationWindow.module.sass';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { addItem } from '../../../hooks/addItem';
import { addFavorite } from '../../../hooks/addFavorite';

export let notification;
export let setNotification;

export function NotificationWindow(props) {
	let checkNotification = false;
	[notification, setNotification] = useState(checkNotification);

	function OpenNotificationWindow() {
		return (
			<>
				<div className={styles.shadow}></div>
				<div className={styles.infoBox}>
					<div className={styles.check}>
						<i className={`fa-solid fa-circle-check`}></i>
					</div>
					<div className={styles.xmark} onClick={closeNotification}>
						<i className={`fa-solid fa-xmark`}></i>
					</div>
					<div className={styles.addItem}>
						Nowy przedmiot został dodany do Twojego koszyka.
					</div>
					<div className={styles.button}>
						<button className={styles.btn1}>
							<Link to={`Koszyk`} className={styles.white}>
								Pokaż koszyk
							</Link>
						</button>
						<button
							className={styles.btn2}
							onClick={closeNotification}>
							Kontynuuj zakupy
						</button>
					</div>
				</div>
			</>
		);
	}

	function closeNotification() {
		setNotification(false);
	}

	function viewProduct() {
		let z = '/oferty/' + props.title + '=' + props.id;
		z = z
			.replaceAll(` `, `-`)
			.toLowerCase()
			.replaceAll(`ą`, `a`)
			.replaceAll(`ć`, `c`)
			.replaceAll(`ę`, `e`)
			.replaceAll(`ł`, `l`)
			.replaceAll(`ń`, `n`)
			.replaceAll(`ó`, `o`)
			.replaceAll(`ś`, `s`)
			.replaceAll(`ź`, `z`)
			.replaceAll(`ż`, `z`);
		return z;
	}

	return (
		<>
			{notification === true ? OpenNotificationWindow() : null}
			<Col>
				<div className={`${styles.box}`}>
					<div className={styles.img}>
						<i
							className={`fa-solid fa-heart ${styles.ico} ${
								props.fav === true ? styles.icoTrue : styles.ico
							}`}
							onClick={addFavorite}
							name={props.id}></i>
						<Link to={viewProduct}>
							<img
								src={props.imgSmall}
								alt={props.shortContent}
							/>
						</Link>
					</div>
					<Link to={viewProduct} className={styles.main}>
						<p
							className={
								styles.status + ' ' + styles[props.status]
							}>
							{props.status}
						</p>
						<h4>
							{props.title}
							{/* {props.title.replace(/^[a-zżźćńółęąś]/i, (match) =>
								match.toUpperCase()
							)} */}
						</h4>
						<p className={styles[props.statusFont]}>
							{props.price} zł
						</p>
						<p className={styles.newPrice}>
							{props.newPrice ? props.newPrice + ` zł` : null}
						</p>
					</Link>
					<div
						className={styles.buy}
						onClick={addItem}
						name={props.id}>
						<button>Dodaj do koszyka</button>
					</div>
				</div>
			</Col>
		</>
	);
}

// export default NotificationWindow;
