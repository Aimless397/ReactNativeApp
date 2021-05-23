import React, { useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const [initialPosition, setInitialPosition] = useState<Location>({
    longitude: 0,
    latitude: 0
  });

  const [userLocation, setUserLocation] = useState<Location>({
    longitude: 0,
    latitude: 0
  });

  const watchId = useRef<number>();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, [])


  useEffect(() => {

    getCurrentLocation()
      .then(location => {

        if (!isMounted.current) { return; }   // Si el componente no está montado, no ejecutar los useState

        setInitialPosition(location);
        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
        setHasLocation(true);
      })

  }, []);


  const getCurrentLocation = (): Promise<Location> => {

    return new Promise((resolve, reject) => {
      // Obtener posición actual
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude
          });
        },
        (err) => reject({ err }), { enableHighAccuracy: true }    // Cambió a false para evitar error en consola
      );

    });
  }

  // Función que sigue al usuario cuando cambia su posición a 10 metros
  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {
        console.log({ coords });
        
        if (!isMounted.current) { return; }   // Si el componente no está montado, no ejecutar los useState

        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude
        }

        setUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      (err) => console.log(err), { enableHighAccuracy: true, distanceFilter: 10 },
    );
  }

  // Función que deja de seguir al usuario si se toca la pantalla
  const stopFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  }

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    userLocation,
    routeLines
  }
}
