import axios from "axios";

export const GET_GENEROS = "GET_GENEROS";
export const GET_MEDIA = "GET_MEDIA";
export const GET_TODO = "GET_TODO";
export const POST_MOVIE = "POST_MOVIE";
export const GET_MOVIEXID = "GET_MOVIEXID";


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
