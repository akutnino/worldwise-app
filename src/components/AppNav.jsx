import { NavLink } from 'react-router-dom';
import styles from '../styles/AppNav.module.scss';

export default function AppNav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to={'cities'}>Cities</NavLink>
				</li>
				<li>
					<NavLink to={'countries'}>Countries</NavLink>
				</li>
			</ul>
		</nav>
	);
}
