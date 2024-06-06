import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const crmApi = createApi({
    reducerPath: "crmApi",
    baseQuery: customFetchBase,
    tagTypes: ["addClient", "editClient", "addEmployment", "editEmployment", " addResidential", "editResidential", "addNextOfKin", "editNextOfKin", "addBankDetails",
        "editBankDetails", "addDocument"],
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
        verifyBvnOrNin: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetVerificationDetailByCusId/${id}`,
            }),
            providesTags: []
        }),
        getAllClient: builder.query({
            query: ({size, page}) => ({
                url: `/CRM/Client/getall?PasgeSize=${size}&PageNumber=${page}`,
            }),
            providesTags: ["addClient", "editClient", "addEmployment", "editEmployment", " addResidential", "editResidential", "addNextOfKin",
                "editNextOfKin", "addBankDetails", "editBankDetails", "addDocument"]
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
    useAddBankDetailsMutation,
    useEditBankDetailsMutation,
    useGetClientByIdQuery,
    useGetAllClientQuery,
    useVerifyBvnOrNinQuery,
} = crmApi