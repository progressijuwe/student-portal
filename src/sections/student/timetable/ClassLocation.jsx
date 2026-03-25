import { APIProvider, Map, Marker, useMapsLibrary, useMap } from '@vis.gl/react-google-maps'
import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

function Directions({ userLocation, destination }) {
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')
  const [directionsService, setDirectionsService] = useState(null)
  const [directionsRenderer, setDirectionsRenderer] = useState(null)

  useEffect(() => {
    if (!routesLibrary || !map) return
    setDirectionsService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#f97316',
        strokeWeight: 5,
      }
    }))
  }, [routesLibrary, map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !userLocation) return
    directionsService.route({
      origin: userLocation,
      destination,
      travelMode: google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === 'OK') directionsRenderer.setDirections(result)
    })
  }, [directionsService, directionsRenderer, userLocation, destination])

  return null
}

export default function ClassLocation({ building, room }) {
  const [userLocation, setUserLocation] = useState(null)
  const [walkTime, setWalkTime] = useState(null)
  const destination = `${building}, Abuja, Nigeria`
  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error('Location error:', err)
    )
  }, [])

  useEffect(() => {
    if (!userLocation || !window.google) return
    const service = new google.maps.DistanceMatrixService()
    service.getDistanceMatrix({
      origins: [userLocation],
      destinations: [destination],
      travelMode: google.maps.TravelMode.WALKING,
    }, (res, status) => {
      if (status === 'OK') {
        const duration = res.rows[0].elements[0].duration.text
        setWalkTime(duration)
      }
    })
  }, [userLocation])

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="bg-white border border-brand-orange rounded-[20px] overflow-hidden w-full md:w-80 shrink-0">
        
        {/* Map */}
        <div className="h-48 w-full">
          <Map
            defaultCenter={{ lat: 9.0765, lng: 7.3986 }} // Abuja default
            defaultZoom={15}
            gestureHandling="greedy"
            disableDefaultUI={true}
            styles={mapStyles}
          >
            {userLocation && <Marker position={userLocation} />}
            {userLocation && (
              <Directions userLocation={userLocation} destination={destination} />
            )}
          </Map>
        </div>

        {/* Info */}
        <div className="py-4 px-6 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="text-xs text-label font-medium">Next Class Location</p>
            <a
              href={navUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-brand-orange font-semibold"
            >
              Nav Link
            </a>
          </div>
          <span className="font-semibold text-xl text-black">
            {building} | {room}
          </span>
          {walkTime && (
            <p className="text-xs text-label font-medium">{walkTime} walk from your location</p>
          )}
        </div>

      </div>
    </APIProvider>
  )
}

// map styling to match your orange theme
const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#f97316' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#f97316' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9e4f5' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e5f5e0' }] },
]