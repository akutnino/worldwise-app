import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';
import { CitiesContextReducer, INITIAL_STATE } from '../functions/CitiesContextReducer';
import PropTypes from 'prop-types';

CitiesProvider.propTypes = {
	children: PropTypes.node,
};

const CitiesContext = createContext();

function CitiesProvider(props) {
	const { children } = props;
	const [state, dispatch] = useReducer(CitiesContextReducer, INITIAL_STATE);
	const { citiesArray, isLoading, currentCity, errorMessage } = state;
	const [watched, setWatched] = useState([]);

	useEffect(() => {
		const controller = new AbortController();

		const fetchCities = async () => {
			try {
				dispatch({ type: 'loading' });

				const fetchURL = `http://localhost:5000/cities`;
				const fetchOptions = {
					Headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					Signal: controller.signal,
				};

				// const response = await fetch(fetchURL, fetchOptions);
				// if (!response.ok) throw new Error('Fetch Response Failed');

				// const data = await response.json();
				const data = watched;
				dispatch({ type: 'cities/loaded', payload: data });
			} catch (error) {
				if (error.name !== 'AbortError') {
					dispatch({ type: 'rejected', payload: error.message });
					console.error({ error });
				}
			}
		};

		fetchCities();
		return () => {
			controller.abort();
		};
	}, [watched]);

	const getCity = useCallback(
		async (id) => {
			if (id === currentCity.id) return;

			try {
				dispatch({ type: 'loading' });

				const fetchURL = `http://localhost:5000/cities/${id}`;
				const fetchOptions = {
					Headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				};

				// const response = await fetch(fetchURL, fetchOptions);
				// if (!response.ok) throw new Error('Fetch Response Failed');

				// const data = await response.json();
				const data = watched.filter((cityObject) => cityObject.id === id);
				console.log(data);
				dispatch({ type: 'city/loaded', payload: data[0] });
			} catch (error) {
				dispatch({ type: 'rejected', payload: error.message });
				console.error({ error });
			}
		},
		[currentCity.id, watched]
	);

	const createCity = async (newCityObject) => {
		try {
			dispatch({ type: 'loading' });

			const fetchURL = `http://localhost:5000/cities`;
			const fetchOptions = {
				method: 'POST',
				Headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(newCityObject),
			};

			// const response = await fetch(fetchURL, fetchOptions);
			// if (!response.ok) throw new Error('Fetch Response Failed');

			// const data = await response.json();
			setWatched((currentCityArray) => [...currentCityArray, newCityObject]);
			dispatch({ type: 'cities/created', payload: newCityObject });
		} catch (error) {
			dispatch({ type: 'rejected', payload: error.message });
			console.log({ error });
		}
	};

	const deleteCity = async (cityID) => {
		try {
			dispatch({ type: 'loading' });

			const fetchURL = `http://localhost:5000/cities/${cityID}`;
			const fetchOptions = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			};

			// const response = await fetch(fetchURL, fetchOptions);
			// if (!response.ok) throw new Error('Fetch Response Failed');

			// const data = await response.json();
			setWatched((currentCityArray) =>
				currentCityArray.filter((cityObject) => cityObject.id !== cityID)
			);
			dispatch({ type: 'cities/deleted', payload: cityID });
		} catch (error) {
			dispatch({ type: 'rejected', payload: error.message });
			console.error({ error });
		}
	};

	return (
		<CitiesContext.Provider
			value={{
				citiesArray,
				isLoading,
				currentCity,
				errorMessage,
				getCity,
				createCity,
				deleteCity,
			}}
		>
			{children}
		</CitiesContext.Provider>
	);
}

function useCities() {
	const context = useContext(CitiesContext);
	const ERROR_MESSAGE = 'useCities() is outside the CitiesProvider() scope!';

	if (context === undefined) throw new Error(ERROR_MESSAGE);
	return context;
}

export { CitiesProvider, useCities };
