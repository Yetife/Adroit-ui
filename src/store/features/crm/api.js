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
        editClient: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/Client/edit`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["completeReview"]
        }),
        addEmployment: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/Employment/add`,
                method: "POST",
                body
            }),
            invalidatesTags: []
        }),
        editEmployment: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/Employment/Update`,
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
        editResidential: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/ResidentialInfo/Update`,
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
        editNextOfKin: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/NextOfKin/Update`,
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
        editBankDetails: builder.mutation({
            query: ({body}) => ({
                url: `/CRM/Bank/Update`,
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
        getClientById: builder.query({
            query: (id) => ({
                url: `/CRM/Client/getbycustId/${id}`,
            }),
            providesTags: []
        }),
        getAllClient: builder.query({
            query: () => ({
                url: `/CRM/Client/getall`,
            }),
            providesTags: []
        }),
    })
})

export const {
    useAddClientMutation,
    useEditClientMutation,
    useAddEmploymentMutation,
    useEditEmploymentMutation,
    useAddResidentialMutation,
    useEditResidentialMutation,
    useAddNextOfKinMutation,
    useEditNextOfKinMutation,
    useAddEditOfKinMutation,
    useAddBankDetailsMutation,
    useEditBankDetailsMutation,
    useGetClientByIdQuery,
    useGetAllClientQuery,
} = crmApi