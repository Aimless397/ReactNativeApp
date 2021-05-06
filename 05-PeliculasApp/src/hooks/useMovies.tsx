import React, { useEffect, useState } from 'react'
import movieDB from '../api/movieDB';
import { Movie, MovieDBMoviesResponse } from '../interfaces/movieInterface';


interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: []
  });   /* moviesState es una constante de tipo MoviesState que tiene las props nowPlaying, popular, topRated, upcoming inicializadas como arreglos vacíos */


  const getMovies = async () => {

    const nowPlayingPromise = movieDB.get<MovieDBMoviesResponse>('/now_playing');   /* Crea promesas de peticiones con Axios de tipo MovieDBMoviesResponse con el parámetro /now_playing */
    const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
    const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');

    const response = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise
    ]);   /* Resuelve todas las promesas y las almacena en response */

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
      topRated: response[2].data.results,
      upcoming: response[3].data.results
    });   /* Establece el estado de moviesState con los resultados de las promesas de cada una de las props */

    setIsLoading(false);    /* Quita el componente de carga */
  }


  useEffect(() => {

    getMovies();    /* Ejecuta la función que hace peticiones a Axios y prepara los resultados de las categorías de películas para luego retornarlos en el hook */

  }, [])    /* Se ejecuta una sola vez */


  return {
    ...moviesState,   /* Retorna la constante moviesState con la data de sus propiedades nowPlaying, popular, topRated y upcoming  */
    isLoading
  }

}
