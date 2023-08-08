import { createStore,applyMiddleware,compose} from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";
//import {composeWithDevTools} from "redux-devtools-extension"


const composeEnhander =  compose;

const store = createStore(
    rootReducer,
    composeEnhander(applyMiddleware(thunkMiddleware))
);


export default store;