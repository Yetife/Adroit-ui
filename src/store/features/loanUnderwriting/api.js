import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const loanUnderwritingApi = createApi({
    reducerPath: "loanUnderwritingApi",
    baseQuery: customFetchBase,
    tagTypes: ["AddStatus", "EditStatus"],
    endpoints: (builder) => ({
        getAllReview: builder.query({
            query: () => ({
                url: `/LoanUnderwriting/Review/get`,
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
        completeReview: builder.mutation({
            query: ({body}) => ({
                url: `/LoanApplication/Customer/Update`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["completeReview"]
        }),
    })
})

export const {
    useGetAllReviewQuery,
    useEditStatusMutation,
    useGetAllCustomerQuery,
    useGetCustomerDetailsQuery,
    useAddCommentMutation,
    useCompleteReviewMutation,

} = loanUnderwritingApi