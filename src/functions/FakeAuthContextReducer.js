export const INITIAL_STATE = {
	user: null,
	isAuthenticated: false,
};

export function FakeAuthContextReducer(currentState, action) {
	switch (action.type) {
		case 'login':
			return {
				...currentState,
				user: action.payload,
				isAuthenticated: true,
			};

		case 'logout':
			return {
				...currentState,
				user: null,
				isAuthenticated: false,
			};

		default:
			return currentState;
	}
}
