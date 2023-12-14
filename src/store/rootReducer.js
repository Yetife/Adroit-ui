import { combineReducers } from "redux";
import snackReducer from "./snackbar/reducer.js"
import {userApi} from "./features/user/api.js";
import {generalSetUpApi} from "./features/generalSetup/api.js";
import {bridgeLoanApi} from "./features/bridgeLoan/api.js";

const appReducers = combineReducers({
    snackBar: snackReducer,
    [userApi.reducerPath]: userApi.reducer,
    [generalSetUpApi.reducerPath]: generalSetUpApi.reducer,
    [bridgeLoanApi.reducerPath]: bridgeLoanApi.reducer,

})
export default appReducers;