import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/FakeAuthContext';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

ProtectedRoute.propTypes = {
	children: PropTypes.node,
};

export default function ProtectedRoute(props) {
	const { children } = props;
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) navigate('/');

		return () => {};
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? children : null;
}
