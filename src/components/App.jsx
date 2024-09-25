import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitiesProvider } from '../contexts/CitiesContext';
import { AuthProvider } from '../contexts/FakeAuthContext';
import { lazy, Suspense } from 'react';

import CityList from './CityList';
import CountryList from './CountryList';
import City from './City';
import Form from './Form';
import ProtectedRoute from '../pages/ProtectedRoute';
import SpinnerFullPage from './SpinnerFullPage';

const Homepage = lazy(() => import('../pages/Homepage'));
const Product = lazy(() => import('../pages/Product'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Login = lazy(() => import('../pages/Login'));
const AppLayout = lazy(() => import('../pages/AppLayout'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

export default function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter basename={import.meta.env.BASE_URL}>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route
								path='/'
								element={<Homepage />}
							/>
							<Route
								path='product'
								element={<Product />}
							/>
							<Route
								path='pricing'
								element={<Pricing />}
							/>
							<Route
								path='login'
								element={<Login />}
							/>
							<Route
								path='app'
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
								<Route
									index
									element={
										<Navigate
											replace
											to='cities'
										/>
									}
								/>
								<Route
									path='cities'
									element={<CityList />}
								/>
								<Route
									path='cities/:id'
									element={<City />}
								/>
								<Route
									path='countries'
									element={<CountryList />}
								/>
								<Route
									path='form'
									element={<Form />}
								/>
							</Route>
							<Route
								path='*'
								element={<PageNotFound />}
							/>
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}
