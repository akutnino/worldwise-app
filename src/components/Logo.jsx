import { Link } from 'react-router-dom';
import styles from '../styles/Logo.module.scss';

export default function Logo() {
	return (
		<Link to={'/'}>
			<img
				src='/logo.png'
				alt='WorldWise logo'
				className={styles.logo}
			/>
		</Link>
	);
}
