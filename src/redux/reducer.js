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
        FETCH_CART_CONTENT
        } from "./actions" 


        //Para guardar en el localStorage el contador del carrito y los id de movies
        const savedCartCount = parseInt(localStorage.getItem('cartCount')) || 0;
        const savedIdSaves = JSON.parse(localStorage.getItem('idSaves')) || [];

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
     Acceso: ''
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
            return { ...state, cartItems: action.payload };

        case ACCESO:
            return {
            ...state,
            Acceso: action.payload
        }

        case BLOQUEAR_ACCESO:
            return {
            ...state,
            Acceso: ''
        }
        
        
        default:
            return {...state}
    }

}


export default rootReducer;