import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Text, View, Image, StyleSheet, Dimensions, ScrollView, ScrollViewBase, ActivityIndicator } from 'react-native';
/* import { Movie } from '../interfaces/movieInterface'; */
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const { height: screenHeight } = Dimensions.get('screen');


/* Se necesita que las propiedades tengan la navegación, información de la ruta y argumentos */
interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

export const DetailScreen = ({ route, navigation }: Props) => {

  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  console.log(movie.id);    // Imprime en consola el id del resultado cargado (idPelícula)

  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);

  console.log({ isLoading, cast, movieFull });    // Imprime las constantes con sus valores en formato objeto


  return (

    <ScrollView>
      <View style={styles.imageContainer}>
        {/* Carga de la portada de la película */}
        <View style={styles.imageBorder}>
          <Image
            source={{ uri }}
            style={styles.posterImage}
          />
        </View>
      </View>

      {/* Carga del título y subtítulo de la película */}
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {
        isLoading
          ? <ActivityIndicator size={30} color="grey" style={{ marginTop: 20 }} />    // Si aún no tengo la información mostrar el spinner
          : <MovieDetails movieFull={movieFull!} cast={cast} />   // Si ya tengo la información mostrar el hook MovieDetails con los datos completos de la película y con el reparto
      }

      {/* Botón para regresar */}
      <View style={styles.backButton}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
        >
          <Icon
            color="white"
            name="arrow-back-outline"
            size={60}
          />

        </TouchableOpacity>
      </View>
    </ScrollView>



  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,

    elevation: 9,

    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5
  }
});