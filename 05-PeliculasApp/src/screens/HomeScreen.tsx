import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';


const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();

  /* console.log(popular) */

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="red" size={50} />
      </View>
    )
  }

  return (
    /* Genera un scroll vertical. No colocar comentarios en la misma línea de las etiquetas */
    <ScrollView>

      <View style={{ marginTop: top + 20 }}>
        {/* <MoviePoster movie={peliculasEnCine[3]} /> */}

        {/* Carousel Principal */}
        <View style={{ height: 440 }}>
          <Carousel
            data={nowPlaying}   /* Carga en data el resultado de la petición a la API con el parámetro /nowPlaying */
            renderItem={({ item }: any) => <MoviePoster movie={item} />}    /* item es el arreglo de movies a los cuales se les extraerá el poster_path dentro de MoviePoster para mostrarlos con el renderItem */
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
          />
        </View>

        {/* Películas Populares */}
        {/* Carga el componente HorizontalSlider con el título a mostrar y los results de popular, todo ello devuelto en un FlatList */}
        <HorizontalSlider title="Popular" movies={popular} />   
        <HorizontalSlider title="Top Rated" movies={topRated} />
        <HorizontalSlider title="Upcoming" movies={upcoming} />

      </View>

    </ScrollView>
  )

}

