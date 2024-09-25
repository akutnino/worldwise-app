export const INITIAL_STATE = {
	citiesArray: [],
	isLoading: false,
	currentCity: {},
	errorMessage: '',
};

export const CitiesContextReducer = (currentState, action) => {
	const currentCitiesArray = currentState.citiesArray;
	const filteredCitiesArray = currentCitiesArray.filter(
		(cityObject) => cityObject.id !== action.payload
	);

	switch (action.type) {
		case 'loading':
			return {
				...currentState,
				isLoading: true,
			};

		case 'cities/loaded':
			return {
				...currentState,
				isLoading: false,
				citiesArray: action.payload,
			};

		case 'city/loaded':
			return {
				...currentState,
				isLoading: false,
				currentCity: action.payload,
			};

		case 'cities/created':
			return {
				...currentState,
				isLoading: false,
				citiesArray: [...currentState.citiesArray, action.payload],
			};

		case 'cities/deleted':
			return {
				...currentState,
				isLoading: false,
				citiesArray: filteredCitiesArray,
			};

		case 'rejected':
			return {
				...currentState,
				isLoading: false,
				errorMessage: action.payload,
			};

		default:
			return currentState;
	}
};
