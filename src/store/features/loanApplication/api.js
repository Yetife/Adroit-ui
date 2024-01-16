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
            providesTags: []
        }),
        getCustomerDetails: builder.query({
            query: (id) => ({
                url: `/LoanApplication/Customer/getbyCusId/${id}`,
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
    })
})

export const {
    useAddStatusMutation,
    useGetAllStatusQuery,
    useEditStatusMutation,
    useGetAllCustomerQuery,
    useGetCustomerDetailsQuery,
    useAddCommentMutation,

} = loanApplicationApi