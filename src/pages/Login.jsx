import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';
import PageNav from '../components/PageNav';
import styles from '../styles/Login.module.scss';
import Button from '../components/Button';

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@example.com');
	const [password, setPassword] = useState('qwerty');
	const { isAuthenticated, login } = useAuth();
	const navigate = useNavigate();

	const handleEmailInput = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event) => {
		setPassword(event.target.value);
	};

	const handleLogin = (event) => {
		event.preventDefault();

		if (email && password) login(email, password);
		return;
	};

	useEffect(() => {
		if (isAuthenticated) navigate('/app', { replace: true });

		return () => {};
	}, [isAuthenticated, navigate]);

	return (
		<main className={styles.login}>
			<PageNav />

			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={handleEmailInput}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={handlePasswordInput}
						value={password}
					/>
				</div>

				<div>
					<Button
						type={'primary'}
						onClick={handleLogin}
					>
						Login
					</Button>
				</div>
			</form>
		</main>
	);
}
