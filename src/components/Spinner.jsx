import styles from '../styles/Spinner.module.scss';

export default function Spinner() {
	return (
		<div className={styles.spinnerContainer}>
			<div className={styles.spinner}></div>
		</div>
	);
}
