import { useEffect, useState } from "react"
import movieDB from "../api/movieDB";
import { Cast, CreditsResponse } from "../interfaces/creditsInterface";
import { MovieFull } from '../interfaces/movieInterface';

interface MovieDetails {    // Define la interfaz MovieDetails con los valores forzados y opcionales
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {

  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: []
  });   // Establece las propiedades del setState con los valores por defecto

  /* console.log(movieId); */   // Obtener el id de la película pasada por parámetros
  
  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);    // Crea una promesa de tipo MovieFull de la petición a la API para obtener los datos completos de la película
    const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);    // Crea una promesa de tipo CreditsResponse de la petición a la API para obtener los datos completos del elenco actoral

    const [movieDetailsResp, castPromiseResp] = await Promise.all([movieDetailsPromise, castPromise]);    // Resuelve las promesas para obtener sus valores

    setState({
      isLoading: false,
      movieFull: movieDetailsResp.data,
      cast: castPromiseResp.data.cast
    });   // Establece las propiedades del setState con los valores actualizados

  }


  useEffect(() => {
    getMovieDetails();    // Ejecuta getMovieDetails al cargarse la página

  }, []);   // Ejecuta una sola vez el useEffect

  return {
    ...state    // Retorna isLoading, movieFull y cast con sus valores establecidos en el setState
  }

}
