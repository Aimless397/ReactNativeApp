import React from 'react'
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';
import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';


interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>
      {/* Detalles */}
      <View style={{ marginHorizontal: 20 }}>

        <View style={{ flexDirection: 'row' }}>
          {/* Muestra un ícono de estrella */}
          <Icon
            name="star-outline"
            color="grey"
            size={16}
          />

          {/* Muestra el promedio de valoración de la película */}
          <Text> {movieFull.vote_average}</Text>

          {/* Muestra los géneros de la película de tipo arreglo unidos y separados por coma */}
          <Text style={{ marginLeft: 5 }}>
            - {movieFull.genres.map(g => g.name).join(', ')}
          </Text>

        </View>

        {/* Historia de la Película */}
        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
          Historia
        </Text>
        <Text style={{ fontSize: 16 }}>
          {movieFull.overview}
        </Text>

        {/* Presupuesto de la Película */}
        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
          Presupuesto
        </Text>
        <Text style={{ fontSize: 18 }}>
          {currencyFormatter.format(movieFull.budget, { code: 'USD' })}   {/* Formatear el budget a dólares */}
        </Text>

      </View>

      {/* Casting */}
      <View style={{ marginTop: 10, marginBottom: 100 }}>
        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>
          Actores
        </Text>

        <FlatList
          data={cast}   /* Toma todos los actores en la propiedad data */
          keyExtractor={(item) => item.id.toString()}   /* Toma como identificador único para el elemento del FlatList el id del elemento del cast, o sea, el actor.id como cadena */
          renderItem={({ item }) => <CastItem actor={item} />}    /* Toma un item de la data y lo pasa como parámetro de actor al componente CastItem para renderizarlo */
          horizontal={true}   /* Propiedad que permite que el FlatList sea horizontal */
          showsHorizontalScrollIndicator={false}    /* Oculta el scroll horizontal */
          style={{ marginTop: 10, height: 70 }}
        />

      </View>
    </>
  )
}
