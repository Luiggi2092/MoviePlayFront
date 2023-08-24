import axios from "axios";
import { actions } from "react-table";
import Swal from 'sweetalert2'
export const RATE_MOVIE = 'RATE_MOVIE';
export const TOGGLE_FAVORITESER = 'TOGGLE_FAVORITESER';
export const SET_RATINGS = 'SET_RATINGS';
export const SET_FAVORITES = 'SET_FAVORITES';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const GET_GENEROS = "GET_GENEROS";
export const GET_MEDIA = "GET_MEDIA";
export const GET_TODO = "GET_TODO";
export const POST_MOVIE = "POST_MOVIE";
export const GET_MOVIEXID = "GET_MOVIEXID";
export const GETSEARCHBAR = "GETSEARCHBAR";
export const GETSEARCHBARCLEAN = "GETSEARCHBARCLEAN";
export const GET_SERIES_ID = "GET_SERIES_ID";
export const GET_SERIES = "GET_SERIES"
export const POST_SERIE = "POST_SERIE";
export const CLEAR_MOVIE_ID = "CLEAR_MOVIE_ID";
export const DELETE_SERIE_ID = 'DELETE_SERIE_ID'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const FETCH_CART_CONTENT = 'FETCH_CART_CONTENT'
export const SAVE_ID_TO_SAVES = 'SAVE_ID_TO_SAVES'
export const UPDATE_CART_COUNT = 'UPDATE_CART_COUNT'
export const ADD_PRODUCT_DETAILS_MOVIE = 'ADD_PRODUCT_DETAILS_MOVIE'
export const ADD_PRODUCT_DETAILS_SERIE = 'ADD_PRODUCT_DETAILS_SERIE'
export const SAVE_ID_TO_SERIES = 'SAVE_ID_TO_SERIES'
export const BANMOVIE= 'BANMOVIE'
export const REMOVE_FROM_CART_AND_REMOVE_DETAILS_MOVIE = 'REMOVE_FROM_CART_AND_REMOVE_DETAILS_MOVIE'
export const REMOVE_FROM_CART_AND_REMOVE_DETAILS_SERIE = 'REMOVE_FROM_CART_AND_REMOVE_DETAILS_SERIE'
const usuario = localStorage.getItem('email')
export const GETSEARCHBARADM = 'GETSEARCHBARADM';
export const GETSEARCHBARCLEANADM = 'GETSEARCHBARCLEANADM';
export const GET_TODOS_LOS_PRODUCTOS = 'GET_TODOS_LOS_PRODUCTOS'
export const TODAS_LAS_ORDENES_DE_COMPRA = 'TODAS_LAS_ORDENES_DE_COMPRA'
export const MOVIESXPAGE = "MOVIESXPAGE"
export const SEARCHNAV = "SEARCHNAV"
export const SERIESXPAGE = "SERIESXPAGE"
export const GET_BUSQUEDA_USER_ADMIN = 'GET_BUSQUEDA_USER_ADMIN'
export const BAN_SERIE = "BAN_SERIE"
export const BUQSERIES = "BUQSERIES"
export const BUQSERIESMOD = "BUQSERIESMOD"
export const GETTOP5MOVIES = "GETTOP5MOVIES"
export const GETTOP5SERIES = "GETTOP5SERIES"
export const ACTMOV= "ACTMOV"
export const TODAS_LAS_COMPRAS = "TODAS_LAS_COMPRAS"
export const ACTSER = "ACTSER"
export const ALLSERNAME = "ALLSERNAME"
export const EMAILSUS = "EMAILSUS"
export const FAVOS = "FAVOS"
export const OBFAV = "OBFAV"

export const toggleFavorite = (movieId) => ({
    type: TOGGLE_FAVORITE,
    payload: movieId
});

export const setRatings = ratings => ({
  type: SET_RATINGS,
  payload: ratings,
});

export const setFavorites = favorites => ({
  type: SET_FAVORITES,
  payload: favorites,
});

export const toggleFavoritSerie = (SeriesId) =>({
   type: TOGGLE_FAVORITESER,
   payload: SeriesId

})

export const rateMovie = (movieId, rating) => ({
    type: RATE_MOVIE,
    payload: { movieId, rating },
});

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
    return async function (dispatch){
        const todoSearchBar = (await axios.get(`/media/todo?busqueda=${name}`)).data.elementos;
        
        dispatch({type: GETSEARCHBAR, payload: todoSearchBar})
    }
}

export const postMovie = (mov,page) => {
    return async function (dispatch){
      
    try{  
      
      const newMovie = await axios.post("/media",mov);
      const movies = (await axios.get(`/admin/disableMovies?page=${page}`)).data.elementos;
      dispatch({type: POST_MOVIE,payload:{ data1: newMovie, data2:movies}})
     
      Swal.fire({
        title:`La Pelicula se Creo con Exito`,
          icon:'success',
          confirmButtonText:'Ok'});

    }catch(error){
      console.log(error);
      Swal.fire({
        title:`${error.response.data.error}`,
          icon:'error',
          confirmButtonText:'Ok'});

    }    
}}

export const getMoviexid = (id)=> {
      return async function (dispatch){
        if(id > 0){
        const detmovie = (await axios.get(`/media/${id}`)).data;
        dispatch({type: GET_MOVIEXID, payload : detmovie })
        }
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
      
      dispatch({type: GET_SERIES, payload : series})
  }
}


export const postSerie =(Serie,page)=>{
    return async function (dispatch){

        try {
            
        const PostSerie = await axios.post(`/series/series`,Serie);
        const ser = (await axios.get(`/admin/disableSeries?page=${page}`)).data.elementos;
      
        
        console.log(PostSerie)
        dispatch({type: POST_SERIE,payload: {data1:PostSerie,data2:ser}});
          Swal.fire({
          title:`La Serie o Episodio se Creo con Exito`,
           icon:'success',
           confirmButtonText:'Ok'});
           
        }catch(error){
          
          console.log("mal"); 
          Swal.fire({
            title:`${error.response.data.error}`,
             icon:'error',
             confirmButtonText:'Ok'});
  
        }    
        
    }
} 

export const clearMovieId = () => {
  return { type: CLEAR_MOVIE_ID };
};

export const getSeriesID = (id, temp, capit)=> {
  return async function (dispatch){
    const seriesId = (await axios.get(`/media/series/${id}`)).data;
    // Utilizamos un objeto para almacenar las temporadas únicas
    const temporadasUnicas = {};
    // Utilizamos reduce para contar las temporadas únicas
    seriesId.Episodios.forEach(episodio => {
      temporadasUnicas[episodio.numTemporada] = true;
    });
    // Obtenemos el número de temporadas únicas
    const cantidadTemporadas = Object.keys(temporadasUnicas).length;
    const arregloTemporada = [];
    for (let i = 1; i <= cantidadTemporadas; i++) {
      arregloTemporada.push(i);
    }
    // Utilizamos un objeto para almacenar los capitulos únicas
    const capitulosUnicos = {};
    // Utilizamos reduce para contar las temporadas únicas
    seriesId.Episodios.forEach(episodio => {
      capitulosUnicos[episodio.numEpisodio] = true;
    });
    // Obtenemos el número de temporadas únicas
    const cantidadCapitulo = Object.keys(capitulosUnicos).length;
    const arregloCapitulo = [];
    for (let i = 1; i <= cantidadCapitulo; i++) {
      arregloCapitulo.push(i);
    }

    // Muestro la temporada 1 y capitulo 1
    const linkS = seriesId.Episodios[0].linkVideo
    const actores = seriesId.actores.map((a) => a).join(', ')
    const genero = seriesId.Genres.map((a) => a.name).join(', ')
    const temporada = seriesId.Episodios[0].numTemporada
    const capitulo = seriesId.Episodios[0].numEpisodio
    const tituloEpisodio = seriesId.Episodios[0].tituloEpisodio

    dispatch(
      {
        type: GET_SERIES_ID, 
        payload: {series: seriesId, link: linkS, actoresP: actores, generos: genero, temp: temporada, catp: capitulo, tituloEpi: tituloEpisodio, cantidadTemporadas: arregloTemporada, cantidadCapitulos: arregloCapitulo}
      }
    )
  }
}


export const getSeriesTempCat = (id, temp, capit)=> {
  return async function (dispatch){
    const seriesId = (await axios.get(`/media/series/${id}`)).data;

    // Utilizamos un objeto para almacenar las temporadas únicas
    const temporadasUnicas = {};
    // Utilizamos reduce para contar las temporadas únicas
    seriesId.Episodios.forEach(episodio => {
      temporadasUnicas[episodio.numTemporada] = true;
    });
    // Obtenemos el número de temporadas únicas
    const cantidadTemporadas = Object.keys(temporadasUnicas).length;
    const arregloTemporada = [];
    for (let i = 1; i <= cantidadTemporadas; i++) {
      arregloTemporada.push(i);
    }
    // Utilizamos un objeto para almacenar los capitulos únicas
    const capitulosUnicos = {};
    // Utilizamos reduce para contar las temporadas únicas
    seriesId.Episodios.forEach(episodio => {
      capitulosUnicos[episodio.numEpisodio] = true;
    });
    // Obtenemos el número de temporadas únicas
    const cantidadCapitulo = Object.keys(capitulosUnicos).length;
    const arregloCapitulo = [];
    for (let i = 1; i <= cantidadCapitulo; i++) {
      arregloCapitulo.push(i);
    }

    let filter = seriesId.Episodios.filter((episodio) => episodio.numTemporada == temp && episodio.numEpisodio == capit)

    // Muestro la temporada 1 y capitulo 1
    const linkS = filter[0].linkVideo
    const actores = seriesId.actores.map((a) => a).join(', ')
    const genero = seriesId.Genres.map((a) => a.name).join(', ')
    const temporada = filter[0].numTemporada
    const capitulo = filter[0].numEpisodio
    const tituloEpisodio = filter[0].tituloEpisodio

    dispatch(
      {
        type: GET_SERIES_ID, 
        payload: {series: seriesId, link: linkS, actoresP: actores, generos: genero, temp: temporada, catp: capitulo, tituloEpi: tituloEpisodio, cantidadTemporadas: arregloTemporada, cantidadCapitulos: arregloCapitulo}
      }
    )
  }
}

export function deleteSerieId() {
  return {
      type: DELETE_SERIE_ID 
  }
}

export const addToCart = (emailUsuario, idSerie, idMovie) => async (dispatch, getState )=> {
  try {
    if(!idSerie){
      const response = await axios.post(`/carroCompra`,{emailUsuario, idMovie});
      dispatch({ type: ADD_TO_CART, payload: response.data }); 
      const state = getState();
        const newCartCount = state.cartCount + 1;
        dispatch({ type: UPDATE_CART_COUNT, payload: newCartCount }); 
        localStorage.setItem('cartCount', newCartCount);
    }
    if(!idMovie){
      const response = await axios.post(`/carroCompra`, {emailUsuario, idSerie});
      dispatch({ type: ADD_TO_CART, payload: response.data });
      const state = getState();
        const newCartCount = state.cartCount + 1;
        dispatch({ type: UPDATE_CART_COUNT, payload: newCartCount }); 
        localStorage.setItem('cartCount', newCartCount);
      
    }
  } catch (error) {
    console.error('Error al agregar al carrito', error);
  }
};



// export const saveIdToSavesMovie = (id) => {
//   return (dispatch, getState) => {
//     const state = getState();
//       const existingId = state.idSavesMovies.find((savedId) => savedId === id);

//       if (!existingId) {
//           const updatedIdSaves = [...state.idSavesMovies, id];
//           localStorage.setItem('idSaves', JSON.stringify(updatedIdSaves));
//           dispatch({
//               type: SAVE_ID_TO_SAVES,
//               payload: updatedIdSaves,
//           });
//       }
//   };
// };

export const addToCartAndSaveDetailsMovie = (productDetails) => async (dispatch) => {
  // const state = getState();
  // const existingProduct = state.savedProductsMovies.find(product => product.id === productDetails.id);

  // if (!existingProduct) {
    await dispatch(addToCart(usuario, null, productDetails.id));
    await dispatch(fetchCartContent(usuario))
    // dispatch(saveIdToSavesMovie(productDetails.id));

    // const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
    // savedProducts.push(productDetails);
    // localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
    
    dispatch({
      type: ADD_PRODUCT_DETAILS_MOVIE,
      payload: productDetails,
    });

};

// export const saveIdToSavesSerie = (id) => {
//   return (dispatch, getState) => {
//     const state = getState();
//     const existingId = state.idSavesSeries.find((savedId) => savedId === id);
    
//     if (!existingId) {
//       const updatedIdSaves = [...state.idSavesSeries, id];
//       localStorage.setItem('idSavesSeries', JSON.stringify(updatedIdSaves));
//       dispatch({
//         type: SAVE_ID_TO_SERIES,
//         payload: updatedIdSaves,
//       });
//     }
//   };
// };

export const addToCartAndSaveDetailsSerie = (productDetails) => async (dispatch) => {
  // const state = getState();
  // const existingProduct = state.savedProductsSeries.find(product => product.id === productDetails.id);
  
  // if (!existingProduct) {
    await dispatch(addToCart(usuario, productDetails.id, null));
    await dispatch(fetchCartContent(usuario))
    // dispatch(saveIdToSavesSerie(productDetails.id));
    
    // const savedProducts = JSON.parse(localStorage.getItem('savedSeries')) || [];
    // savedProducts.push(productDetails);
    // localStorage.setItem('savedSeries', JSON.stringify(savedProducts));
    
    dispatch({
      type: ADD_PRODUCT_DETAILS_SERIE,
      payload: productDetails,
    });
  // }
};

export const ActivaroDesactivarMovies = (id)=> {
       return async function (dispatch){

        try{
          const banmov = await axios.put(`/admin/disableMovies/${id}`);
          console.log(banmov);
          console.log("vamos")
          dispatch({type: BANMOVIE, payload: banmov})    
          Swal.fire({
            title:`${banmov.data.message}`,
             icon:'success',
             confirmButtonText:'Ok'});
             

       }catch(error){
        Swal.fire({
          title:`${error.response.data.error}`,
           icon:'error',
           confirmButtonText:'Ok'}); 
       }
}}


export const removeFromCart = (emailUsuario, idSerie, idMovie) => async (dispatch, getState )=> {
  try {
    if(!idSerie){
      const response = await axios.delete(`/carroCompra?emailUsuario=${emailUsuario}&idMovie=${idMovie}`);
      dispatch({ type: REMOVE_FROM_CART, payload: response.data });

      // const state = getState();
      // const newCartCount = state.cartCount - 1; 
      // dispatch({ type: UPDATE_CART_COUNT, payload: newCartCount }); 
      // localStorage.setItem('cartCount', newCartCount);
      // const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
      // const updatedSavedProducts = savedProducts.filter(product => product.id !== idMovie);
      // if(updatedSavedProducts !== []){
      //   localStorage.removeItem('savedProducts');
      //   const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
      //   localStorage.setItem('savedProducts',JSON.stringify(updatedSavedProducts)) ;
      // }        
    }
    if(!idMovie){
      const response = await axios.delete(`/carroCompra?emailUsuario=${emailUsuario}&idSerie=${idSerie}` );
      dispatch({ type: REMOVE_FROM_CART, payload: response.data }); 
      // const state = getState();
      //   const newCartCount = state.cartCount - 1; 
      //   dispatch({ type: UPDATE_CART_COUNT, payload: newCartCount }); 
      //   localStorage.setItem('cartCount', newCartCount);
      //   const savedProducts = JSON.parse(localStorage.getItem('savedSeries')) || [];
      //   const updatedSavedProducts = savedProducts.filter(product => product.id !== idSerie);
      //   if(updatedSavedProducts !== []){
      //     localStorage.removeItem('savedSeries');
      //     const savedProducts = JSON.parse(localStorage.getItem('savedSeries')) || [];
      //     localStorage.setItem('savedSeries',JSON.stringify(updatedSavedProducts)) ;
      //   } 
    }
  } catch (error) {
    console.error('Error al eliminar del carrito', error);
  }
};

//Trae el contenido del carrito de DB
export const fetchCartContent = (email) => async (dispatch) => {
  try {    
    const response = await axios.get(`/carroCompra?emailUsuario=${email}` );
    dispatch({ type: FETCH_CART_CONTENT, payload: response.data.CarroCompra }); 
  } catch (error) {
    console.error('Error al obtener el contenido del carrito', error);
  }
};

export const removeFromCartAndRemoveDetailsMovie = (productId) => async (dispatch) => {
  try {
    await dispatch(removeFromCart(usuario, null, productId)); 
    await dispatch(fetchCartContent(usuario))  
    dispatch({
      type: REMOVE_FROM_CART_AND_REMOVE_DETAILS_MOVIE,
      payload: productId,
    });
  } catch (error) {
    console.error('Error al eliminar producto', error);
  }
};

export const removeFromCartAndRemoveDetailsSerie = (productId) => async (dispatch) => {
  try {
    await dispatch(removeFromCart(usuario, productId, null)); 
    await dispatch(fetchCartContent(usuario))
    dispatch({
      type: REMOVE_FROM_CART_AND_REMOVE_DETAILS_SERIE,
      payload: productId,
    });
  } catch (error) {
    console.error('Error al eliminar producto', error);
  }
};


export const getTodobusquedaAdm = (name)=> {
  // console.log(name);
  return async function (dispatch){
      const todoSearchBar = (await axios.get(`/admin/disableMovies?busqueda=${name}`)).data.elementos;
      dispatch({type: GETSEARCHBARADM, payload: todoSearchBar})
  }
}


export const getTodoFillCleanAdm = ()=> {
  return function (dispatch){
    dispatch({type:GETSEARCHBARCLEANADM,payload: []})
  }
}

export const ActualizarMovie = (id,form,page)=> {
  return async function  (dispatch){
    try{
       
    const ActMov = await axios.put(`/admin/updateMovies/${id}`,form) ;
    const Movies = (await axios.get(`/admin/disableMovies?page=${page}`)).data.elementos
    console.log(ActMov);
    dispatch({type:ACTMOV,payload:{ data : ActMov, data1: Movies}})
    Swal.fire({
      title:`${ActMov.data.message}`,
       icon:'success',
       confirmButtonText:'Ok'});
     

    }catch(error){
      Swal.fire({
        title:`${error.response.data.error}`,
         icon:'error',
         confirmButtonText:'Ok'});

    }

  }
}

export const todosLosProductosXidUser = (id) => {
return async function (dispatch){
  const {data} = await axios.get(`/ordenCompra/getTodoxUser?idUser=${id}` 
  )
  dispatch({type:GET_TODOS_LOS_PRODUCTOS, payload:data})
}
}

export const todasLasOrdenesDeCompra = (id) => {
  return async function(dispatch){
    const productos = await axios.get(`/ordenCompra/getOCsxUser?idUser=${id}`
    )
    dispatch({type:TODAS_LAS_ORDENES_DE_COMPRA, payload:productos.data})
  }
}

export const todasLasComprasAdmin = (page) => {
  return async function(dispatch){
    const {data} = await axios.get(`/ordenCompra/getAllOCs?page=${page}`)
    dispatch({type:TODAS_LAS_COMPRAS, payload:data})
  }
}

export const moviesxPage =(page)=> {
  return async function(dispatch){
    const mov = (await axios.get(`/admin/disableMovies?page=${page}`)).data;
    // console.log(mov.totalPages + "llego");
    dispatch({type:MOVIESXPAGE,payload: { dato1:mov.elementos,dato2:mov.currentPage,dato3:mov.totalPages }})
  }
}

export const BusquedaAdmin = (Searchbuq) => {

    return function (dispatch) {
      dispatch({type:SEARCHNAV,
        payload: Searchbuq
 })     } 
}


export const SeriesxPage =(page)=> {

   return async function(dispatch)
   {
    const ser = (await axios.get(`/admin/disableSeries?page=${page}`)).data;
   
    dispatch({type :SERIESXPAGE, payload: {dato1: ser.elementos,dato2: ser.currentPage,dato3:ser.totalPages}})
   }   
}

export const getUserAdmin = (busqueda) => {
  return async function (dispatch) {
    
    const {data} = await axios.get(`/admin/allUser?busqueda=${busqueda}`)

    dispatch({type: GET_BUSQUEDA_USER_ADMIN, payload: data})
  }
} 


export const ActivarDesactivarSeries = (id,page)=> {
   return async function (dispatch) {

    try{
     const banserie = await axios.put(`/admin/disableSeries/${id}`);
     const ser = (await axios.get(`/admin/disableSeries?page=${page}`)).data.elementos;
     dispatch({type: BAN_SERIE, payload: {data1:banserie,data2:ser}});
     Swal.fire({
      title:`${banserie.data.message}`,
       icon:'success',
       confirmButtonText:'Ok'});
      
    }catch(error){
      Swal.fire({
        title:`${error.response.data.error}`,
         icon:'error',
         confirmButtonText:'Ok'});

    } 
    }
  
   }




export const getTodoBusqedaAdmSeries = (name)=> {
    return async function (dispatch){

    const buqtodoSeries = (await axios.get(`/admin/disableSeries/?busqueda=${name}`)).data.elementos;
    // console.log(buqtodoSeries);
    dispatch({type: BUQSERIES, payload: buqtodoSeries})

    }  
    
   

}


export const getTopFiveMovies =()=> {
   return async function(dispatch){

    const Top5Movies = (await axios.get(`/admin/topFiveMovies`)).data
    dispatch({type: GETTOP5MOVIES, payload: Top5Movies})

   }
}


export const getTopFiveSeries = ()=> {

    return async function(dispatch){

      const Top5Series = (await axios.get(`/admin/topFiveSeries`)).data
      dispatch({type: GETTOP5SERIES, payload: Top5Series})
    }
}

export const ActualizarSeries = (id,form,page)=> {

   return async function(dispatch){

    try{
    
      const ActSer = await axios.put(`/admin/updateSeries/${id}`,form);
      console.log(ActSer)
      const Series = (await axios.get(`/admin/disableSeries?page=${page}`)).data.elementos

      dispatch({type:ACTSER, payload: {dato: ActSer,dato1: Series} })

      Swal.fire({
        title:`${ActSer.data.message}`,
         icon:'success',
         confirmButtonText:'Ok'});
       
  

    }catch(error){

      Swal.fire({
        title:`${error.response.data.error}`,
         icon:'error',
         confirmButtonText:'Ok'});

    }

    
      

   }
}

export const AllNameSeries = ()=> {
      return async function(dispatch){
         
        const AllSeries = (await axios.get(`/media/allSeries`)).data;
        

        dispatch({type: ALLSERNAME,payload: AllSeries})
     

      }
    
}

export const emailSuscripcion = (email)=> {
      return {
         type:EMAILSUS,
         payload:email
      }
     
}

export const CreateReview = (form)=> {

      return async function(){
          
       try{ 
        const Review = await axios.post(`/review`,form);
        console.log(Review);
        Swal.fire({
          title:`Gracias por tu Calificacion`,
           icon:'success',
           confirmButtonText:'Ok'});
       
       }catch(error){


       }





      }


}


export const ActPerfil =(id,form)=> {
     
    return async function (){
        
      try{
        const PostPerfil = await axios.put(`/usuario/${id}`,form);

        Swal.fire({
          title:`${PostPerfil.data}`,
           icon:'success',
           confirmButtonText:'Ok'});
       
      
      }catch(error){
        console.log(error);
      }

    }
    
   
}


export const AgregarAFavoritos = (form)=> {
    return async function (dispatch){
      
      try{
      const ADDFAV = await axios.post(`/favs`,form);
      dispatch({type: FAVOS,payload: ADDFAV})

      }catch(error){

        Swal.fire({
          title:`${error.response.data.error}`,
           icon:'error',
           confirmButtonText:'Ok'});
  
      }
  
         
      }

    }

export const ObtenerFavoritos = (email) => {

    return async function(dispatch){

      const ObFav = (await axios.get(`/favs?email=${email}`)).data.Multimedia;
      const ObFavSer = (await axios.get(`/favs?email=${email}`)).data.Series;
      
      dispatch({type: OBFAV, payload: {data1:ObFav,data2:ObFavSer}})      
    }


}

export const EliminarFav = (email,MovieId,SerieId)=> {
   return async function(dispatch){
    if(MovieId){
      const EliMovFav = await axios.delete(`/favs?email=${email}&MultimediumId=${MovieId}`);
    }

    if(SerieId){
      const EliMovFav = await axios.delete(`/favs?email=${email}&SeriesSerieId=${SerieId}`);
      

    }
      
   }

}

