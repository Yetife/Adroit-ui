import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import rootReducer from "./rootReducer";

import {userApi} from "./features/user/api.js";
import {generalSetUpApi} from "./features/generalSetup/api.js";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            userApi.middleware,
            generalSetUpApi.middleware
        ]),
});

setupListeners(store.dispatch);

export default store;
