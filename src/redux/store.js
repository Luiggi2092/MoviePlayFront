import { createStore,applyMiddleware,compose} from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"


const composeEnhander = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
    rootReducer,
    composeEnhander(applyMiddleware(thunkMiddleware),composeWithDevTools())
);


export default store;