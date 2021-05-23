import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../pages/LoadingScreen';
import { Fab } from './Fab';


interface Props {
  markers?: Marker[];
}

export const Map = ({ markers }: Props) => {

  const [showPolyline, setShowPolyline] = useState(true);

  const { userLocation, hasLocation, initialPosition, routeLines, getCurrentLocation, followUserLocation, stopFollowUserLocation } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);


  useEffect(() => {
    // Sigue al usuario
    followUserLocation();   //Se ejecuta al cargar el screen por primera vez

    return () => {
      //Cancela el seguimiento al usuario para evitar desbordamiento de memoria al salir y volver a entrar a la app constantemente
      stopFollowUserLocation();   //Se ejecuta cuando se destruye el componente, o sea, cuando se cambia de screen
    }
  }, [])


  useEffect(() => {

    if (!following.current) return;

    const location = userLocation;
    mapViewRef.current?.animateCamera({
      center: location
    });
  }, [userLocation])

  const centerPosition = async () => {
    // Obtiene la latitud y longitud de la posición actual  
    const location = await getCurrentLocation();

    following.current = true;

    // Fija la cámara a la ubicación central del usuario
    mapViewRef.current?.animateCamera({
      center: location
    });

  }

  if (!hasLocation) {
    return <LoadingScreen />
  }


  return (
    <>
      <MapView
        ref={(el) => mapViewRef.current = el!}
        style={{ flex: 1 }}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => following.current = false}

      >
        {
          (showPolyline) && (
            <Polyline
              coordinates={routeLines}
              strokeColor="black"
              strokeWidth={3}
            />
          )
        }

        {/* <Marker
          image={require('../assets/custom-marker.png')}
          //key={index}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={"Esto es un marcador"}
          description={"Descripción del marcador"}
        /> */}
      </MapView>

      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10
        }}
      />

      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(value => !value)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 10
        }}
      />
    </>
  )
}
