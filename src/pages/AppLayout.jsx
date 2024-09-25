import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import User from '../components/User';
import styles from '../styles/AppLayout.module.scss';

export default function AppLayout(props) {
	return (
		<div className={styles.app}>
			<Sidebar />
			<Map />
			<User />
		</div>
	);
}
