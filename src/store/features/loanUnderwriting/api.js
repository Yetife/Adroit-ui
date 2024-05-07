import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const loanUnderwritingApi = createApi({
    reducerPath: "loanUnderwritingApi",
    baseQuery: customFetchBase,
    tagTypes: ["AddStatus", "EditStatus"],
    endpoints: (builder) => ({
        getReviewCustomerDetails: builder.query({
            query: (id) => ({
                url: `/LoanUnderwriting/Review/getbyLoanId/${id}`,
            }),
            providesTags: []
        }),
        getDisbursementCustomerDetails: builder.query({
            query: (id) => ({
                url: `/Disbursement/getbyLoanId/${id}`,
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
            query: ({size, page, applicationId, name, phone, email, channel, startDate, endDate }) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(applicationId && { ApplicationId: applicationId }),
                    ...(name && { ApplicantName: name }),
                    ...(phone && { Status: phone }),
                    ...(email && { EmailAddress: email }),
                    ...(channel && { Channel: channel }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                    // ...filters
                };
                return {
                    url: `/Approval/get`,
                    params: queryParams,
                };
            },
            providesTags: ["approveApplication", "disburseApplication"]
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
            query: ({size, page, applicationId, name, phone, email, channel, startDate, endDate, loanCategory }) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(applicationId && { ApplicationId: applicationId }),
                    ...(name && { ApplicantName: name }),
                    ...(phone && { Status: phone }),
                    ...(email && { EmailAddress: email }),
                    ...(channel && { Channel: channel }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                    ...(loanCategory && { LoanCategory: loanCategory }),

                    // ...filters
                };
                return {
                    url: `/Disbursement/get`,
                    params: queryParams,
                };
            },
            providesTags: ["disburseApplication", "stopDisbursement", "manualDisbursement"]
        }),
        getAllDisbursementRestructure: builder.query({
            query: ({size, page, applicationId, name, phone, email, channel, startDate, endDate }) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    category: 2,
                    // Add optional parameters conditionally
                    ...(applicationId && { ApplicationId: applicationId }),
                    ...(name && { ApplicantName: name }),
                    ...(phone && { Status: phone }),
                    ...(email && { EmailAddress: email }),
                    ...(channel && { Channel: channel }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                    // ...filters
                };
                return {
                    url: `/Disbursement/getbyloantype`,
                    params: queryParams,
                };
            },
            providesTags: ["disburseApplication", "stopDisbursement", "manualDisbursement"]
        }),
        getAllDisbursementTopUp: builder.query({
            query: ({size, page, applicationId, name, phone, email, channel, startDate, endDate }) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    category: 1,
                    // Add optional parameters conditionally
                    ...(applicationId && { ApplicationId: applicationId }),
                    ...(name && { ApplicantName: name }),
                    ...(phone && { Status: phone }),
                    ...(email && { EmailAddress: email }),
                    ...(channel && { Channel: channel }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                    // ...filters
                };
                return {
                    url: `/Disbursement/getbyloantype`,
                    params: queryParams,
                };
            },
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
    // useGetAllApprovalQuery,
    useEditStatusMutation,
    useGetAllDisbursementQuery,
    useGetAllDisbursementRestructureQuery,
    useGetAllDisbursementTopUpQuery,
    useGetReviewCustomerDetailsQuery,
    useGetDisbursementCustomerDetailsQuery,
    useStopDisbursementMutation,
    // useApproveApplicationMutation,
    useDisburseApplicationMutation,
    useGetAdjustmentDetailsQuery,
    useManualDisbursementMutation,

} = loanUnderwritingApi