import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ImageColors from "react-native-image-colors"

import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage';


const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {

    ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
      .then((colors: any) => {

        if (isMounted.current === false) {
          return;
        }

        (colors.platform === 'android')
          ? setBgColor(colors.dominant || 'grey')
          : setBgColor(colors.background);

      })
    // IOS: background

    // Android: dominant


    return () => {
      isMounted.current = false;
    }

  }, [])


  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={
        () => navigation.navigate('PokemonScreen', { 
          simplePokemon: pokemon,
          color: bgColor
        })
      }
    >
      <View style={{
        ...styles.cardContainer,
        width: windowWidth * 0.4,
        backgroundColor: bgColor
      }}>
        {/* Nombre del Pokemon e ID */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {`\n#${pokemon.id}`}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>


        <FadeInImage
          uri={pokemon.picture}
          style={styles.pokemonImage}
        />

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    /* overflow: 'hidden' */
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10
  },
  pokebolaContainer: {
    /* backgroundColor: 'blue', */
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: 'hidden'
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20
  },
  pokemonImage: {
    width: 110,
    height: 110,
    position: 'absolute',
    right: -7,
    bottom: -9
  },
})