import PropTypes from 'prop-types';
import styles from '../styles/Button.module.scss';

Button.propTypes = {
	type: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node,
};

export default function Button(props) {
	const { type, onClick, children } = props;

	return (
		<button
			type='submit'
			className={`${styles.btn} ${styles[type]}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
