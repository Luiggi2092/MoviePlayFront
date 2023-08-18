import {GET_GENEROS,
        GET_MEDIA,
        GET_TODO,
        POST_MOVIE,
        GET_MOVIEXID, 
        GET_SERIES_ID,
        GET_SERIES, 
        // GET_SERIES_PAGE, 
        // GET_GENEROS_SERIES,
        GETSEARCHBAR,
        GETSEARCHBARCLEAN,
        POST_SERIE,
        CLEAR_MOVIE_ID,
        DELETE_SERIE_ID,
        ADD_TO_CART,
        REMOVE_FROM_CART,
        FETCH_CART_CONTENT,
        SAVE_ID_TO_SAVES,
        UPDATE_CART_COUNT,
        ADD_PRODUCT_DETAILS_MOVIE,
        ADD_PRODUCT_DETAILS_SERIE,
        SAVE_ID_TO_SERIES,
        REMOVE_FROM_CART_AND_REMOVE_DETAILS_MOVIE,
        REMOVE_FROM_CART_AND_REMOVE_DETAILS_SERIE,
        GETSEARCHBARADM,
        GETSEARCHBARCLEANADM,
        GET_TODOS_LOS_PRODUCTOS,
        TODAS_LAS_ORDENES_DE_COMPRA,
        MOVIESXPAGE,
        SEARCHNAV,
        GET_BUSQUEDA_USER_ADMIN
        } from "./actions" 


        //Para guardar en el localStorage el contador del carrito , id de series y movies
        // const savedCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        // const savedIdSaves = JSON.parse(localStorage.getItem('idSaves')) || [];
        // const savedIdSeries = JSON.parse(localStorage.getItem('idSavesSeries')) || [];
        const moviesSaved = JSON.parse(localStorage.getItem('savedProducts')) || [];
        const seriesSaved = JSON.parse(localStorage.getItem('savedSeries')) || [];

const initialState = {
     Generos: [],
     Media:[],
     Todo:[],
     TodoFill:[],
     NewMovie:[],
     MovieId:[],
     SerieID: [],
     NewSerie:[],
     UrlSerie: '',
     ActoresSeries: '',
     generos: '',
     temporadaSerie: '',
     catipuloSerie: '',
     tituloEpisodio: '',
     cantidadTemporadas: [],
     cantidadCapitulos: [],
     cartItems: [],
     carrito:{},
    //  cartCount: savedCartCount,
    // //  idSavesMovies: savedIdSaves,
     savedProductsMovies: [],
     savedProductsSeries: [],
    //  idSavesSeries: savedIdSeries,
     Acceso: '',
     SearchAdmimovie:[],
     productosComprados:[],
     todasLasCompras:[],
     Movies:[],
     numPage: 1,
     Search: "",
     GetUserAdmin: []

}

const rootReducer =(state = initialState,action)=> {

switch(action.type){

    case GET_GENEROS:
        return {...state, Generos:action.payload}

    case GET_MEDIA:
        return {...state, Media: action.payload}   
        
    case GET_TODO:
        return {...state, Todo: action.payload}

    case POST_MOVIE:
        return {...state, NewMovie : action.payload}     
    case GET_MOVIEXID:
        return {...state, MovieId:action.payload}
    
    case GETSEARCHBAR:
        return {...state, TodoFill: action.payload}
    case GETSEARCHBARCLEAN:
        return {...state, TodoFill: action.payload}  
    case POST_SERIE:
         return {...state, NewSerie: action.payload}   
    case CLEAR_MOVIE_ID:
         return { ...state, MovieId: [] }
    case GET_SERIES_ID: {
        return {...state, 
            SerieID: action.payload.series,
            UrlSerie: action.payload.link,
            ActoresSeries: action.payload.actoresP,
            generos: action.payload.generos,
            temporadaSerie: action.payload.temp,
            temporadaSerie: action.payload.temp,
            catipuloSerie: action.payload.catp,
            tituloEpisodio: action.payload.tituloEpi,
            cantidadTemporadas: action.payload.cantidadTemporadas,
            cantidadCapitulos: action.payload.cantidadCapitulos
        }
    }
    case DELETE_SERIE_ID: {
        return {...state, SerieID: [], UrlSerie: ''}
    }
    case ADD_TO_CART:
        return { ...state, cartItems: action.payload };

    case FETCH_CART_CONTENT:
        return { ...state, carrito: action.payload };

    case SAVE_ID_TO_SAVES: 
        return {...state, idSavesMovies: action.payload};                   
    
    case SAVE_ID_TO_SERIES: 
            return {...state, idSavesSeries: action.payload}               
    
    case UPDATE_CART_COUNT:
        return { ...state, cartCount: action.payload };

        case ADD_PRODUCT_DETAILS_MOVIE: {
                // const newSavedProducts = [...state.savedProductsMovies, action.payload];
                // localStorage.setItem('savedProducts', JSON.stringify(newSavedProducts));
              
                return {...state, savedProductsMovies: action.payload };
              }

            
        case ADD_PRODUCT_DETAILS_SERIE: {
                // const newSavedProducts = [...state.savedProductsSeries, action.payload];
                // localStorage.setItem('savedSeries', JSON.stringify(newSavedProducts));
              
                return { ...state, savedProductsSeries: action.payload };
              }

    // case REMOVE_FROM_CART_AND_REMOVE_DETAILS_MOVIE: {
    //         const productId = action.payload;
    //         const updatedSavedProducts = state.savedProductsMovies.length > 0 ?state.savedProductsMovies.filter(product => product.id !== productId): null;
    //         const moviesSaved = JSON.parse(localStorage.getItem('savedProducts')) || [];
    //         if(updatedSavedProducts !== []){
    //             localStorage.setItem('savedProducts', JSON.stringify(updatedSavedProducts));}
      
    //         return {
    //           ...state,
    //           savedProductsMovies: moviesSaved,
    //         };
    //       }
      
    // case REMOVE_FROM_CART_AND_REMOVE_DETAILS_SERIE: {
    //         const productId = action.payload;
    //         const updatedSavedProducts = state.savedProductsSeries.filter(product => product.id !== productId);
    //         const seriesSaved = JSON.parse(localStorage.getItem('savedSeries')) || [];
    //         if(updatedSavedProducts !== []){
    //             localStorage.setItem('savedSeries', JSON.stringify(updatedSavedProducts));}
      
    //         return {
    //           ...state,
    //           savedProductsSeries: seriesSaved,
    //         };
    //       }

    case GETSEARCHBARADM:
        return {
            ...state,
            SearchAdmimovie: action.payload

        }

        case GETSEARCHBARCLEANADM:
            return {
                ...state,
                SearchAdmimovie: []
            }
        case GET_TODOS_LOS_PRODUCTOS:
            return{
                ...state,
                productosComprados: action.payload
            }
        case TODAS_LAS_ORDENES_DE_COMPRA:
            return{
                ...state,
                todasLasCompras:action.payload
            }
        case MOVIESXPAGE:
            return {
                
                ...state,
                Movies:action.payload
            }    
  
         case SEARCHNAV : 
            return {
                 ...state,
                 Search : action.payload
            }  

        
        case GET_BUSQUEDA_USER_ADMIN: 
        return {
            ...state,
            GetUserAdmin: action.payload
        }


        default:
            return {...state}
    }

}


export default rootReducer;