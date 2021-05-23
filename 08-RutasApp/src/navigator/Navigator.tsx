import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { PermissionsContext } from '../context/PermissionsContext';
import { LoadingScreen } from '../pages/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {

  const {permissions} = useContext(PermissionsContext);   // Obtener el estado de los permisos

  if(permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
      initialRouteName="PermissionsScreen"    // Definir pantalla de inicio
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >

      {
        (permissions.locationStatus === 'granted')    /* Si el permiso ha sido otorgado, regresar el MapaScreen, sino el PermissionsScreen */
        ? <Stack.Screen name="MapScreen" component={MapScreen} />
        : <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      }
      
    </Stack.Navigator>
  );
}