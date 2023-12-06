import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: customFetchBase,
    tagTypes: ["ValidateUser"],

    endpoints: (builder) => ({
        validateUser: builder.mutation({
            query: ({body}) => ({
                url: `/Adroit/Login/ValidateUser`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["ValidateUser"],
        }),
    }),
});

export const {
    useValidateUserMutation,
} = userApi;
