import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const loanUnderwritingApi = createApi({
    reducerPath: "loanUnderwritingApi",
    baseQuery: customFetchBase,
    tagTypes: ["AddStatus", "EditStatus"],
    endpoints: (builder) => ({
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
            query: ({size, page}) => ({
                url: `/Approval/get?PasgeSize=${size}&PageNumber=${page}`,
            }),
            providesTags: ["approveApplication"]
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
            query: ({size, page}) => ({
                url: `/Disbursement/get?PasgeSize=${size}&PageNumber=${page}`,
            }),
            providesTags: ["disburseApplication", "stopDisbursement", "manualDisbursement"]
        }),
        stopDisbursement: builder.mutation({
            query: ({body}) => ({
                url: `/Disbursement/StopDisbursement`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["stopDisbursement"]
        }),
        manualDisbursement: builder.mutation({
            query: ({body}) => ({
                url: `/Approval/ManualDisbursementDeterminate`,
                method: "POST",
                body
            }),
            invalidatesTags: ["manualDisbursement"]
        }),
        getAdjustmentDetails: builder.query({
            query: (id) => ({
                url: `/LoanUnderwriting/Review/getAdjustbyCusId/${id}`,
            }),
            providesTags: []
        }),
    })
})

export const {
    useGetAllApprovalQuery,
    useEditStatusMutation,
    useGetAllDisbursementQuery,
    useGetReviewCustomerDetailsQuery,
    useStopDisbursementMutation,
    useApproveApplicationMutation,
    useDisburseApplicationMutation,
    useGetAdjustmentDetailsQuery,
    useManualDisbursementMutation,

} = loanUnderwritingApi