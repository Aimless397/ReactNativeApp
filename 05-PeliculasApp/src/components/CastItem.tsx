import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native';
import { Cast } from '../interfaces/creditsInterface'


interface Props {
  actor: Cast
}

export const CastItem = ({ actor }: Props) => {

  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`    /* Link personalizado que recibe el parámetro de profile_path que contiene la foto del actor a cargar */

  return (
    /* Retorna la tarjeta del actor con su imagen, su nombre y personaje */
    <View style={styles.container}>
      {
        /* Si existe el profile_path, mostrar su imagen */
        actor.profile_path && (
          <Image
            source={{ uri }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
        )
      }

      {/* Muestra la información del actor, como su nombre y personaje */}
      <View style={styles.actorInfo}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {actor.name}
        </Text>
        <Text style={{ fontSize: 16, opacity: 0.7 }}>
          {actor.character}
        </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
    marginLeft: 20,
    paddingRight: 15,
    
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  }
})