import axios from "axios";

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'de46e93d76ed5abecab169e8b2143d1f',
    language: 'es-ES'
  }
});   /* Realiza la consulta a la API usando Axios y pasándole la base de la URL */

export default movieDB;