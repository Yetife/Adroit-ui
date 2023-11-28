import { combineReducers } from "redux";
import snackReducer from "./snackbar/reducer.js"

const appReducers = combineReducers({
    snackBar: snackReducer,
})
export default appReducers;