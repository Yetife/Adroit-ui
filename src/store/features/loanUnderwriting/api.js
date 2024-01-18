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
            providesTags: ["returnApplication"]
        }),
        getReviewCustomerDetails: builder.query({
            query: (id) => ({
                url: `/LoanUnderwriting/Review/getbyCusId/${id}`,
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
        approveApplication: builder.mutation({
            query: ({body}) => ({
                url: `/LoanUnderwriting/Review/Update`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["approveApplication"]
        }),
        getAllApproval: builder.query({
            query: () => ({
                url: `/Approval/get`,
            }),
            providesTags: []
        }),
        adjustApplication: builder.mutation({
            query: ({body}) => ({
                url: `/LoanUnderwriting/Review/Adjust`,
                method: "POST",
                body
            }),
            invalidatesTags: ["adjustApplication"]
        }),
        returnApplication: builder.mutation({
            query: ({body}) => ({
                url: `/Approval/Return`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["returnApplication"]
        }),
        disburseApplication: builder.mutation({
            query: ({body}) => ({
                url: `/Approval/Disburse`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["disburseApplication"]
        }),
        getAllDisbursement: builder.query({
            query: () => ({
                url: `/Disbursement/get`,
            }),
            providesTags: ["disburseApplication", "stopDisbursement"]
        }),
        stopDisbursement: builder.mutation({
            query: ({body}) => ({
                url: `/Disbursement/StopDisbursement`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["stopDisbursement"]
        }),
    })
})

export const {
    useGetAllReviewQuery,
    useGetAllApprovalQuery,
    useEditStatusMutation,
    useGetAllDisbursementQuery,
    useGetReviewCustomerDetailsQuery,
    useStopDisbursementMutation,
    useAdjustApplicationMutation,
    useApproveApplicationMutation,
    useReturnApplicationMutation,
    useDisburseApplicationMutation,

} = loanUnderwritingApi