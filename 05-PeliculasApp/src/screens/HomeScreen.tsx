import React from 'react'
import { ActivityIndicator, Button, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';



export const HomeScreen = () => {

  const { peliculasEnCine, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="red" size={50} />
      </View>
    )
  }

  return (

    <View style={{ marginTop: top + 20 }}>
      {/* <MoviePoster movie={peliculasEnCine[3]} /> */}

      <Carousel
        data={peliculasEnCine}
        renderItem={ () => <MoviePoster movie={peliculasEnCine[3]} />}
        sliderWidth={350}
        itemWidth={300}
      />


    </View>
  )
}
