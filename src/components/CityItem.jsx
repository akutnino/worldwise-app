import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
import PropTypes from 'prop-types';
import styles from '../styles/CityItem.module.scss';

const unicodeToEmoji = (flagUnicode) => {
	const FIRST_CHARACTER_UNICODE = 127462; // https://www.alt-codes.net/flags
	const TOTAL_ALPHABET_CHARACTERS = 26;
	const ALPHABET_ARRAY = Array.from(Array(TOTAL_ALPHABET_CHARACTERS))
		.map((val, index) => index)
		.map((val, index) => String.fromCodePoint('A'.codePointAt() + index));

	const flagCodeString = [...flagUnicode]
		.map((flagChar) => {
			if (ALPHABET_ARRAY.includes(flagChar)) return flagChar;

			const unicodeDifference = flagChar.codePointAt() - FIRST_CHARACTER_UNICODE;
			return String.fromCodePoint(unicodeDifference + 'A'.codePointAt());
		})
		.join('');

	return (
		<img
			src={`https://flagsapi.com/${flagCodeString}/flat/24.png`}
			alt='flagEmoji'
		/>
	);
};

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date));

CityItem.propTypes = {
	cityObject: PropTypes.object,
};

export default function CityItem(props) {
	const { cityObject } = props;
	const {
		cityName,
		date,
		emoji,
		id,
		position: { lat, lng },
	} = cityObject;
	const { currentCity, deleteCity } = useCities();
	const isCurrentCity = id === currentCity.id ? styles['cityItem--active'] : '';

	const handleDeleteCity = (cityID) => {
		return (event) => {
			event.preventDefault();
			deleteCity(cityID);
		};
	};

	return (
		<li>
			<Link
				to={`${id}?lat=${lat}&lng=${lng}`}
				className={`${styles.cityItem} ${isCurrentCity}`}
			>
				<span className={styles.emoji}>{unicodeToEmoji(emoji)}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.data}>( {formatDate(date)} )</time>
				<button
					className={styles.deleteBtn}
					onClick={handleDeleteCity(id)}
				>
					&times;
				</button>
			</Link>
		</li>
	);
}
