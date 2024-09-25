import PropTypes from 'prop-types';
import styles from '../styles/CountryItem.module.scss';

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
			src={`https://flagsapi.com/${flagCodeString}/flat/64.png`}
			alt='Flag Emoji'
		/>
	);
};

CountryItem.propTypes = {
	country: PropTypes.object,
};

export default function CountryItem(props) {
	const { country } = props;

	return (
		<li className={styles.countryItem}>
			<span>{unicodeToEmoji(country.emoji)}</span>
			<span>{country.country}</span>
		</li>
	);
}
