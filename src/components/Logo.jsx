import { Link } from 'react-router-dom';
import styles from '../styles/Logo.module.scss';
import logo from '../../public/logo.png';

export default function Logo() {
	return (
		<Link to={'/'}>
			<img
				src={logo}
				alt='WorldWise logo'
				className={styles.logo}
			/>
		</Link>
	);
}
