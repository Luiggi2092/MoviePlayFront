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
        UPDATE_CART_COUNT,
        SAVE_ID,
        ADD_CAR,
        DELETE_CAR,
        GET_CAR
        ,
        ACCESO,
        BLOQUEAR_ACCESO} from "./actions" 


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
     items: []
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
        
        case UPDATE_CART_COUNT:
            const existingMovie = state.idSaves.find((id) => id === action.payload.id);
            if(existingMovie){
                return state
            }else{
                const newCartCount = state.cartCount + parseFloat(action.payload);
                localStorage.setItem('cartCount', newCartCount);
                return {
                ...state,
                items: [...state.items, action.payload],
            };
        case REMOVE_FROM_CAR:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        
        case GET_CAR:
                return {
                  ...state,
                  carItems: action.payload,
                };

        case ADD_CAR:
                return {
                  ...state,
                  carrito: [...state.carrito, action.payload],
                };

        case DELETE_CAR:
                // Actualiza el estado eliminando el elemento correspondiente del carrito
                const updatedCarrito = state.carrito.filter(item => {
                  if (action.payload.idSerie) {
                    return item.idSerie !== action.payload.idSerie;
                  } else if (action.payload.idMovie) {
                    return item.idMovie !== action.payload.idMovie;
                  }
                  return true;
                });
              
                return {
                  ...state,
                  carrito: updatedCarrito,
                };

        default:
            return {...state}
    }

}


export default rootReducer;