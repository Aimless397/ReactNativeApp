import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movieInterface';

/* Se usa type cuando no serán extendidos y las interfaces cuando pueden ser extendidos */
export type RootStackParams = {
  HomeScreen: undefined;
  DetailScreen: Movie;
}


const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          /* backgroundColor: 'white' */
        }

      }}
    >
      {/* Se crean los stacks que tienen el nombre del stack a cargar y el componente que utilizarán */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
}