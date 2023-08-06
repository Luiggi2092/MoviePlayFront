import axios from "axios";

export const GET_GENEROS = "GET_GENEROS";
export const GET_MEDIA = "GET_MEDIA";
export const GET_TODO = "GET_TODO";
export const POST_MOVIE = "POST_MOVIE";
export const GET_MOVIEXID = "GET_MOVIEXID";
export const GETSEARCHBAR = "GETSEARCHBAR";
export const GETSEARCHBARCLEAN = "GETSEARCHBARCLEAN";
export const GET_SERIES = "GET_SERIES";
export const GET_SERIES_PAGE = "GET_SERIES_PAGE";
export const GET_GENEROS_SERIES = "GET_GENEROS_SERIES";

export const getGeneros = ()=> {
   return async function (dispatch){
     const {data} = await axios.get("/genres");
     const generos = data
     dispatch({type: GET_GENEROS, payload : generos})
   }
   

}

export const getMovies = ()=> {
    return async function (dispatch){
        const movie = await axios.get("/media");
       // console.log(movie);
        dispatch({type:GET_MEDIA, payload : movie})
    }
}

export const getTodo = ()=> {
    return async function (dispatch){
        const todo = (await axios.get("/media/todo")).data.elementos;
        dispatch({type: GET_TODO, payload: todo})
    }
}

export const getTodobusqueda = (name)=> {
    console.log(name);
    return async function (dispatch){
        const todoSearchBar = (await axios.get(`/media/todo?busqueda=${name}`)).data.elementos;
        console.log(todoSearchBar);
        dispatch({type: GETSEARCHBAR, payload: todoSearchBar})
    }
}

export const postMovie = (mov) => {
     return async function (dispatch){
        const newMovie = await axios.post("/media",mov);
        dispatch({type: POST_MOVIE,payload: newMovie})
     }
}

export const getMoviexid = (id)=> {
      return async function (dispatch){
        const detmovie = (await axios.get(`/media/${id}`)).data;
        dispatch({type: GET_MOVIEXID, payload : detmovie })
      }
}
export const getTodoFillClean = ()=> {
       return function (dispatch){
         dispatch({type:GETSEARCHBARCLEAN,payload: []})
       }
}

export const getSeries = ()=> {
  return async function (dispatch){
      const series = (await axios.get("/media/series")).data.elementos;
      // console.log(series)
      dispatch({type: GET_SERIES, payload : series})
  }
}

export const getSeriesPage = (page)=> {
  return async function (dispatch){
      const seriesPage = (await axios.get(`/media/series?page=${page}`)).data.elementos;
      // console.log(series)
      dispatch({type: GET_SERIES_PAGE, payload : seriesPage})
  }
}

export const getGenerosSeries = (gen)=> {
  return async function (dispatch){
      const generosSeries = (await axios.get(`/media/series?genre=${gen}`)).data.elementos;
      // console.log(generosSeries)
      dispatch({type: GET_GENEROS_SERIES, payload: generosSeries})
  }
}