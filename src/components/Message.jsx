import PropTypes from 'prop-types';
import styles from '../styles/Message.module.scss';

Message.propTypes = {
	message: PropTypes.string
};

export default function Message(props) {
	const { message } = props;

	return (
		<p className={styles.message}>
			<span role='img'>👋</span> {message}
		</p>
	);
}
