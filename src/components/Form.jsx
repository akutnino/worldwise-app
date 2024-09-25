// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useCities } from '../contexts/CitiesContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from './Button';
import Message from './Message';
import styles from '../styles/Form.module.scss';

const unicodeToEmoji = (flagUnicode) => {
	if (!flagUnicode) return '';
	return (
		<img
			src={`https://flagsapi.com/${flagUnicode}/flat/24.png`}
			alt='Flag Emoji'
		/>
	);
};

export default function Form() {
	const { createCity, isLoading } = useCities();
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [mapLat, mapLng] = useUrlPosition();
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [countryEmoji, setCountryEmoji] = useState('');
	const [geocodingError, setGeocodingError] = useState('');
	const navigate = useNavigate();

	const handleCityNameInput = (event) => {
		setCityName(event.target.value);
	};

	const handleDateInput = (date) => {
		setDate(date);
	};

	const handleNotesInput = (event) => {
		setNotes(event.target.value);
	};

	const handleBackBtn = (event) => {
		event.preventDefault();
		navigate('/app/cities');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji: countryEmoji,
			date,
			notes,
			position: { lat: mapLat, lng: mapLng },
		};

		await createCity(newCity);
		navigate('/app/cities');
	};

	useEffect(() => {
		const controller = new AbortController();

		const fetchCityData = async () => {
			try {
				setIsLoadingGeocoding(true);
				setGeocodingError('');

				const fetchURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${mapLat}&longitude=${mapLng}`;
				const fetchOptions = {
					Headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					signal: controller.signal,
				};

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('FETCH REQUEST FAILED');

				const data = await response.json();
				if (!data.countryCode) throw new Error('NOT A CITY. CLICK SOMEWHERE ELSE!');

				setCityName(data.city || data.locality || '');
				setCountry(data.countryName);
				setCountryEmoji(data.countryCode);
			} catch (error) {
				if (error.name !== 'AbortError') {
					setGeocodingError(error.message);
				}
			} finally {
				setIsLoadingGeocoding(false);
			}
		};

		if (!mapLat && !mapLng) return;
		fetchCityData();
		return () => {
			controller.abort();
		};
	}, [mapLat, mapLng]);

	return (
		<>
			{geocodingError && <Message message={geocodingError} />}

			{!geocodingError && (
				<form
					className={`${styles.form} ${isLoading ? styles.loading : ''}`}
					onSubmit={handleSubmit}
				>
					<div className={styles.row}>
						<label htmlFor='cityName'>City name</label>
						<input
							id='cityName'
							onChange={handleCityNameInput}
							value={cityName}
						/>
						<span className={styles.flag}>{unicodeToEmoji(countryEmoji)}</span>
					</div>

					<div className={styles.row}>
						<label htmlFor='date'>When did you go to {cityName}?</label>
						<DatePicker
							id='date'
							selected={date}
							onChange={handleDateInput}
							dateFormat='MMMM d, yyyy'
						/>
					</div>

					<div className={styles.row}>
						<label htmlFor='notes'>Notes about your trip to {cityName}</label>
						<textarea
							id='notes'
							onChange={handleNotesInput}
							value={notes}
						/>
					</div>

					<div className={styles.buttons}>
						<Button type={'primary'}>Add</Button>
						<Button
							type={'back'}
							onClick={handleBackBtn}
						>
							Back
						</Button>
					</div>
				</form>
			)}
		</>
	);
}
