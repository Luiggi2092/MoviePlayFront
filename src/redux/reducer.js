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
        ACCESO,
        BLOQUEAR_ACCESO,
        ADD_TO_CART,
        REMOVE_FROM_CART,
        FETCH_CART_CONTENT,
        SAVE_ID_TO_SAVES,
        UPDATE_CART_COUNT,
        ADD_PRODUCT_DETAILS_MOVIE,
        ADD_PRODUCT_DETAILS_SERIE,
        SAVE_ID_TO_SERIES
        } from "./actions" 


        //Para guardar en el localStorage el contador del carrito , id de series y movies
        const savedCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        const savedIdSaves = JSON.parse(localStorage.getItem('idSaves')) || [];
        const savedIdSeries = JSON.parse(localStorage.getItem('idSavesSeries')) || [];
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
     cartCount: savedCartCount,
     idSavesMovies: savedIdSaves,
     savedProductsMovies: moviesSaved,
     savedProductsSeries: seriesSaved,
     idSavesSeries: savedIdSeries

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

        case REMOVE_FROM_CART:
            return { ...state, cartItems: action.payload };

        case FETCH_CART_CONTENT:
            return { ...state, carrito: action.payload };

        case SAVE_ID_TO_SAVES: {
            return {
                    ...state,
                    idSavesMovies: action.payload,
                };
            }
        
        case SAVE_ID_TO_SERIES: {
                return {
                        ...state,
                        idSavesSeries: action.payload,
                    };
                }
        
        case UPDATE_CART_COUNT:
            return { ...state, cartCount: action.payload };

        case ADD_PRODUCT_DETAILS_MOVIE: {
                const newSavedProducts = [...state.savedProductsMovies, action.payload];
                localStorage.setItem('savedProducts', JSON.stringify(newSavedProducts));
              
                return {
                  ...state,
                  savedProductsMovies: newSavedProducts,
                };
              }

        default:
            return {...state}
    }

}


export default rootReducer;