import {GET_GENEROS} from "./actions"

const initialState = {
     Generos: [],
}

const rootReducer =(state = initialState,action)=> {
 
    switch(action.type){

        case GET_GENEROS:
            return {...state, Generos:action.payload}

        default:
            return {...state}
    }

}


export default rootReducer;