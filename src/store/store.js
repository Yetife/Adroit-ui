import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import rootReducer from "./rootReducer";

import {userApi} from "./features/user/api.js";
import {generalSetUpApi} from "./features/generalSetup/api.js";
import {bridgeLoanApi} from "./features/bridgeLoan/api.js";
import {administrationApi} from "./features/administration/api.js";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            userApi.middleware,
            generalSetUpApi.middleware,
            bridgeLoanApi.middleware,
            administrationApi.middleware,
        ]),
});

setupListeners(store.dispatch);

export default store;
