import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
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

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Fetch Response Failed');

				const data = await response.json();
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
	}, []);

	const getCity = useCallback(
		async (id) => {
			if (Number(id) === currentCity.id) return;

			try {
				dispatch({ type: 'loading' });

				const fetchURL = `http://localhost:5000/cities/${id}`;
				const fetchOptions = {
					Headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				};

				const response = await fetch(fetchURL, fetchOptions);
				if (!response.ok) throw new Error('Fetch Response Failed');

				const data = await response.json();
				dispatch({ type: 'city/loaded', payload: data });
			} catch (error) {
				dispatch({ type: 'rejected', payload: error.message });
				console.error({ error });
			}
		},
		[currentCity.id]
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

			const response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Fetch Response Failed');

			const data = await response.json();
			dispatch({ type: 'cities/created', payload: data });
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

			const response = await fetch(fetchURL, fetchOptions);
			if (!response.ok) throw new Error('Fetch Response Failed');

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
