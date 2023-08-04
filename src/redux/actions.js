import axios from "axios";

export const GET_GENEROS = "GET_GENEROS";

export const getGeneros = ()=> {
   return async function (dispatch){
     const generos = await axios.get("/genres");
     console.log(generos);
     dispatch({type: GET_GENEROS, payload : generos})
   }
   

}