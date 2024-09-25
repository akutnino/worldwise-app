import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import Footer from './Footer';
import styles from '../styles/Sidebar.module.scss';

export default function Sidebar(props) {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<Outlet />
			<Footer />
		</div>
	);
}
