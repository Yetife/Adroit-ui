import { combineReducers } from "redux";
import snackReducer from "./snackbar/reducer.js"
import {userApi} from "./features/user/api.js";
import {generalSetUpApi} from "./features/generalSetup/api.js";
import {bridgeLoanApi} from "./features/bridgeLoan/api.js";
import documentationReducer from './documentationSlice.js'
import {administrationApi} from "./features/administration/api.js";
import {loanApplicationApi} from "./features/loanApplication/api.js";
import {staffLoanApi} from "./features/staff/api.js";
import {loanUnderwritingApi} from "./features/loanUnderwriting/api.js";
const appReducers = combineReducers({
    snackBar: snackReducer,
    [userApi.reducerPath]: userApi.reducer,
    [generalSetUpApi.reducerPath]: generalSetUpApi.reducer,
    [bridgeLoanApi.reducerPath]: bridgeLoanApi.reducer,
    [administrationApi.reducerPath]: administrationApi.reducer,
    [loanApplicationApi.reducerPath]: loanApplicationApi.reducer,
    [loanUnderwritingApi.reducerPath]: loanUnderwritingApi.reducer,
    [staffLoanApi.reducerPath]: staffLoanApi.reducer,
    documentation: documentationReducer,

})
export default appReducers;