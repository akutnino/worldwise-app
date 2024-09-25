import { useCities } from '../contexts/CitiesContext';
import CityItem from './CityItem';
import Message from './Message';
import styles from '../styles/CityList.module.scss';

export default function CityList(props) {
	const { citiesArray } = useCities();
	const citiesArrayIsEmpty = citiesArray.length === 0;
	const emptyCitiesArrayMessage = 'Add Your First City by Clicking on the Map!';

	return (
		<>
			{citiesArrayIsEmpty && <Message message={emptyCitiesArrayMessage} />}

			{!citiesArrayIsEmpty && (
				<ul className={styles.cityList}>
					{citiesArray.map((cityObject) => (
						<CityItem
							cityObject={cityObject}
							key={cityObject.id}
						/>
					))}
				</ul>
			)}
		</>
	);
}
