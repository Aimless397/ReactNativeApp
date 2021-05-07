import React from 'react'
import { Text, View, FlatList } from 'react-native'

import { Movie } from '../interfaces/movieInterface'
import { MoviePoster } from './MoviePoster'

interface Props {
  title?: string;
  movies: Movie[]
}

export const HorizontalSlider = ({ title, movies }: Props) => {
  return (

    <View style={{
      /* backgroundColor: 'red', */
      height: (title) ? 260 : 220
    }}>
      {/* Carga de la categoría de listado */}
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>{title}</Text>

      {/* Se renderiza el FlatList horizontal que contendrá las portadas de cada película perteneciente a la categoría */}
      <FlatList
        data={movies}   /* La data a cargar será un arreglo de películas */
        renderItem={({ item }: any) => (
          <MoviePoster movie={item} width={140} height={200} />   /* Toma un item de la data y lo pasa como parámetro de movie al componente MoviePoster para renderizarlo */
        )}
        keyExtractor={(item) => item.id.toString()}   /* Toma como identificador único para el elemento del FlatList el id del elemento de la movie, o sea, el pelicula.id como cadena */
        horizontal={true}   /* Propiedad que permite que el FlatList sea horizontal */
        showsHorizontalScrollIndicator={false}    /* Oculta el scroll horizontal */
      />
    </View>
  )
}
