import { useState } from 'react';

export function useGeolocation(positionObject = null) {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState(positionObject);
	const [error, setError] = useState(null);

	function getUserPosition() {
		if (!navigator.geolocation)
			return setError('Your browser does not support geolocation');

		setIsLoading(true);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({
					lat: pos.coords.latitude,
					lng: pos.coords.longitude,
				});
				setIsLoading(false);
			},
			(error) => {
				setError(error.message);
				setIsLoading(false);
			}
		);
	}

	return [{ isLoading, position, error }, getUserPosition];
}
