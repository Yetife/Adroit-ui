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
        addEmployment: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/Employment/add`,
                method: "POST",
                body
            }),
            invalidatesTags: []
        }),
        addResidential: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/ResidentialInfo/add`,
                method: "POST",
                body
            }),
            invalidatesTags: []
        }),
        addNextOfKin: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/NextOfKin/add`,
                method: "POST",
                body
            }),
            invalidatesTags: []
        }),
        addBankDetails: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/Bank/add`,
                method: "POST",
                body
            }),
            invalidatesTags: []
        }),
        addDocument: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/Document/add`,
                method: "POST",
                body
            }),
            invalidatesTags: []
        }),
    })
})

export const {
    useAddClientMutation,
    useAddEmploymentMutation,
    useAddResidentialMutation,
    useAddNextOfKinMutation,
    useAddBankDetailsMutation,
    useAddDocumentMutation,
} = crmApi