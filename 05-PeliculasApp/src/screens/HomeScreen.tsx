import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from "react-native-image-colors"

import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';


const { width: windowWidth } = Dimensions.get('window');

export const HomeScreen = () => {

  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const { setMainColors, /* setPreviousMainColors */ } = useContext(GradientContext);

  /* console.log(popular) */

  const getPosterColor = async (index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    console.log({ primary, secondary });

    setMainColors({ primary: primary, secondary: secondary });

  }

  useEffect(() => {
    if (nowPlaying.length > 0) {
      getPosterColor(0)
    }
  }, [nowPlaying])    // Considero que no es necesario el nowPlaying, debería ir vacío


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="red" size={50} />
      </View>
    )
  }

  return (
    <GradientBackground>

      {/* Genera un scroll vertical. No colocar comentarios en la misma línea de las etiquetas */}
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
              onSnapToItem={index => getPosterColor(index)}
            />
          </View>

          {/* Películas Populares */}
          {/* Carga el componente HorizontalSlider con el título a mostrar y los results de popular, todo ello devuelto en un FlatList */}
          <HorizontalSlider title="Popular" movies={popular} />
          <HorizontalSlider title="Top Rated" movies={topRated} />
          <HorizontalSlider title="Upcoming" movies={upcoming} />

        </View>

      </ScrollView>

    </GradientBackground>
  )

}

