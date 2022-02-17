import { combineReducers, createStore    } from "redux";
import { authReducer } from "./authReducer"


const rootReducer = combineReducers({
    authReducer
})


export const store = createStore(rootReducer)