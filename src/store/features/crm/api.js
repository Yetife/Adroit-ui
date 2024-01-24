import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const crmApi = createApi({
    reducerPath: "crmApi",
    baseQuery: customFetchBase,
    tagTypes: [],
    endpoints: (builder) => ({
        addClient: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/Client/add`,
                method: "POST",
                body
            }),
            invalidatesTags: []
        }),
    })
})

export const {
    useAddClientMutation,
} = crmApi