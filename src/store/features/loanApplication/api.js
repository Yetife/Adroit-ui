import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const loanApplicationApi = createApi({
    reducerPath: "loanApplicationApi",
    baseQuery: customFetchBase,
    tagTypes: ["AddStatus", "EditStatus"],
    endpoints: (builder) => ({
        addStatus: builder.mutation({
            query: ({body}) => ({
                url: `/LoanApplication/LoanStatus/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddStatus"]
        }),
        getAllStatus: builder.query({
            query: () => ({
                url: `/LoanApplication/LoanStatus/getallvalid`,
            }),
            providesTags: ["AddStatus", "EditStatus"]
        }),
        editStatus: builder.mutation({
            query: ({body}) => ({
                url: `/LoanApplication/LoanStatus/Update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["EditStatus"]
        }),
        getAllCustomer: builder.query({
            query: () => ({
                url: `/LoanApplication/Customer/get`,
            }),
            providesTags: ["completeReview"]
        }),
        getCustomerDetails: builder.query({
            query: (id) => ({
                url: `/LoanApplication/Customer/getbyCusId/${id}`,
            }),
            providesTags: []
        }),
        getAdjustCustomerDetails: builder.query({
            query: (id) => ({
                url: `/LoanApplication/Adjust/getbyCusId/${id}`,
            }),
            providesTags: []
        }),
        addComment: builder.mutation({
            query: ({body}) => ({
                url: `/LoanApplication/Customer/addComment`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddComment"]
        }),
        getAllComment: builder.query({
            query: (id) => ({
                url: `/LoanApplication/Customer/getComments/${id}`,
            }),
            providesTags: ["AddComment"]
        }),
        completeReview: builder.mutation({
            query: ({body}) => ({
                url: `/LoanApplication/Customer/Update`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["completeReview"]
        }),
        getAllAdjust: builder.query({
            query: () => ({
                url: `/LoanApplication/Adjust/get`,
            }),
            providesTags: []
        }),
        declineApplication: builder.mutation({
            query: ({body}) => ({
                url: `/LoanApplication/Customer/Decline`,
                method: "POST",
                body
            }),
            invalidatesTags: ["declineApplication"]
        }),
        getAllDeclined: builder.query({
            query: () => ({
                url: `/LoanApplication/Declined/get`,
            }),
            providesTags: ["declineApplication"]
        }),
        requestDocument: builder.mutation({
            query: ({body}) => ({
                url: `/LoanApplication/Customer/addRequestedDocument`,
                method: "POST",
                body
            }),
            invalidatesTags: ["requestDocument"]
        }),
    })
})

export const {
    useAddStatusMutation,
    useGetAllStatusQuery,
    useGetAllCommentQuery,
    useEditStatusMutation,
    useGetAllCustomerQuery,
    useGetAllAdjustQuery,
    useGetAllDeclinedQuery,
    useGetCustomerDetailsQuery,
    useGetAdjustCustomerDetailsQuery,
    useAddCommentMutation,
    useDeclineApplicationMutation,
    useCompleteReviewMutation,
    useRequestDocumentMutation,
} = loanApplicationApi