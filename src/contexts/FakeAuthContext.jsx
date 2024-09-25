import { createContext, useContext, useReducer } from 'react';
import {
	FakeAuthContextReducer,
	INITIAL_STATE,
} from '../functions/FakeAuthContextReducer';
import PropTypes from 'prop-types';

AuthProvider.propTypes = {
	children: PropTypes.node,
};

const FAKE_USER = {
	name: 'Jack',
	email: 'jack@example.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

const AuthContext = createContext();

function AuthProvider(props) {
	const { children } = props;
	const [state, dispatch] = useReducer(FakeAuthContextReducer, INITIAL_STATE);
	const { user, isAuthenticated } = state;

	const login = (email, password) => {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: 'login', payload: FAKE_USER });
		}
	};

	const logout = () => {
		dispatch({ type: 'logout' });
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth(params) {
	const context = useContext(AuthContext);
	const ERROR_MESSAGE = 'useAuth() is outside the AuthProvider() scope!';

	if (context === undefined) throw new Error(ERROR_MESSAGE);
	return context;
}

export { AuthProvider, useAuth };
