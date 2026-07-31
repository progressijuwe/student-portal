import {
	APIProvider,
	Map,
	Marker,
	useMapsLibrary,
	useMap,
} from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useState } from 'react';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * Draws a walking route from the student to their next class.
 *
 * The DirectionsService and DirectionsRenderer are imperative Google Maps
 * objects, so they are built with useMemo from the library handle rather than
 * being pushed into state from an effect — the previous version stored them via
 * setState inside an effect, which forced two extra render passes every time
 * the map library resolved.
 */
function Directions({ userLocation, destination }) {
	const map = useMap();
	const routesLibrary = useMapsLibrary('routes');

	const directionsService = useMemo(
		() => (routesLibrary ? new routesLibrary.DirectionsService() : null),
		[routesLibrary],
	);

	const directionsRenderer = useMemo(
		() =>
			routesLibrary && map
				? new routesLibrary.DirectionsRenderer({
						map,
						suppressMarkers: true,
						polylineOptions: {
							strokeColor: '#f97316',
							strokeWeight: 5,
						},
					})
				: null,
		[routesLibrary, map],
	);

	// Detach the renderer from the map when this unmounts, or the drawn route
	// stays on the map after the component is gone.
	useEffect(() => {
		return () => directionsRenderer?.setMap(null);
	}, [directionsRenderer]);

	useEffect(() => {
		if (!directionsService || !directionsRenderer || !userLocation) return;

		let cancelled = false;

		directionsService.route(
			{
				origin: userLocation,
				destination,
				travelMode: google.maps.TravelMode.WALKING,
			},
			(result, status) => {
				if (!cancelled && status === 'OK') {
					directionsRenderer.setDirections(result);
				}
			},
		);

		return () => {
			cancelled = true;
		};
	}, [directionsService, directionsRenderer, userLocation, destination]);

	return null;
}

export default function ClassLocation({ building, room }) {
	const [userLocation, setUserLocation] = useState(null);
	const [walkTime, setWalkTime] = useState(null);

	const destination = `${building}, Abuja, Nigeria`;
	const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`;

	// Geolocation is a browser API — subscribing to it is exactly what effects
	// are for. Failure is silent by design: the card still shows the venue, it
	// just cannot show a walking time.
	useEffect(() => {
		let cancelled = false;

		navigator.geolocation?.getCurrentPosition(
			(position) => {
				if (cancelled) return;

				setUserLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			},
			() => {
				/* Permission denied or unavailable — walking time is optional. */
			},
		);

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (!userLocation || !window.google) return;

		let cancelled = false;
		const service = new google.maps.DistanceMatrixService();

		service.getDistanceMatrix(
			{
				origins: [userLocation],
				destinations: [destination],
				travelMode: google.maps.TravelMode.WALKING,
			},
			(response, status) => {
				if (cancelled || status !== 'OK') return;

				setWalkTime(
					response.rows[0]?.elements[0]?.duration?.text ?? null,
				);
			},
		);

		return () => {
			cancelled = true;
		};
		// `destination` is included so a change of venue recalculates the walk.
	}, [userLocation, destination]);

	if (!API_KEY) {
		// Without a key the Map renders an error tile; a plain card is better.
		return (
			<div className='w-full shrink-0 overflow-hidden rounded-[20px] border border-brand-orange bg-white px-6 py-4 md:w-80'>
				<p className='text-xs font-medium text-label'>
					Next Class Location
				</p>
				<span className='text-xl font-semibold text-black'>
					{building} | {room}
				</span>
			</div>
		);
	}

	return (
		<APIProvider apiKey={API_KEY}>
			<div className='w-full shrink-0 overflow-hidden rounded-[20px] border border-brand-orange bg-white md:w-80'>
				<div className='h-48 w-full'>
					<Map
						defaultCenter={{ lat: 9.0765, lng: 7.3986 }}
						defaultZoom={15}
						gestureHandling='greedy'
						disableDefaultUI={true}
						styles={mapStyles}
					>
						{userLocation && <Marker position={userLocation} />}
						{userLocation && (
							<Directions
								userLocation={userLocation}
								destination={destination}
							/>
						)}
					</Map>
				</div>

				<div className='flex flex-col gap-1 px-6 py-4'>
					<div className='flex items-center justify-between'>
						<p className='text-xs font-medium text-label'>
							Next Class Location
						</p>
						<a
							href={navUrl}
							target='_blank'
							rel='noreferrer'
							className='text-xs font-semibold text-brand-orange'
						>
							Nav Link
						</a>
					</div>
					<span className='text-xl font-semibold text-black'>
						{building} | {room}
					</span>
					{walkTime && (
						<p className='text-xs font-medium text-label'>
							{walkTime} walk from your location
						</p>
					)}
				</div>
			</div>
		</APIProvider>
	);
}

// Map styling to match the portal's orange theme.
const mapStyles = [
	{ elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
	{ elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
	{
		featureType: 'road',
		elementType: 'geometry',
		stylers: [{ color: '#ffffff' }],
	},
	{
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [{ color: '#f97316' }],
	},
	{
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [{ color: '#f97316' }],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [{ color: '#c9e4f5' }],
	},
	{
		featureType: 'poi.park',
		elementType: 'geometry',
		stylers: [{ color: '#e5f5e0' }],
	},
];
