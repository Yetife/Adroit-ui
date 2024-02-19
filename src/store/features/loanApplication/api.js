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
            query: ({size, page, applicationId, name, statusName, email, channel, startDate, endDate }) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(applicationId && { ApplicationId: applicationId }),
                    ...(name && { ApplicantName: name }),
                    ...(statusName && { Status: statusName }),
                    ...(email && { EmailAddress: email }),
                    ...(channel && { Channel: channel }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                    // ...filters
                };
                return {
                    url: `/LoanApplication/Customer/get`,
                    params: queryParams,
                };
            },
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
                    url: `/LoanApplication/Adjust/get`,
                    params: queryParams,
                };
            },
            providesTags: ["completeReview", "declineApplication"]
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
                    url: `/LoanApplication/Declined/get`,
                    params: queryParams,
                };
            },
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
        getCustomerData: builder.query({
            query: (id) => ({
                url: `/LoanApplication/Customer/getCustomerLoanDecision/${id}`,
            }),
            providesTags: []
        }),
        reassignLoan: builder.mutation({
            query: ({body}) => ({
                url: `/LoanApplication/Customer/Reassignment`,
                method: "POST",
                body
            }),
            invalidatesTags: []
        }),
        getReassignedLoan: builder.query({
            query: (id) => ({
                url: `/LoanApplication/Customer/getReassignmentByUserId/${id}`,
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
        getAllReview: builder.query({
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
                    url: `/LoanUnderwriting/Review/get`,
                    params: queryParams,
                };
            },
            providesTags: ["returnApplication", "adjustApplication", "completeReview"]
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
    useGetCustomerDataQuery,
    useGetAdjustCustomerDetailsQuery,
    useAddCommentMutation,
    useDeclineApplicationMutation,
    useCompleteReviewMutation,
    useRequestDocumentMutation,
    useReassignLoanMutation,
    useGetReassignedLoanQuery,
    useGetAllReviewQuery,
    useAdjustApplicationMutation,
    useReturnApplicationMutation,
} = loanApplicationApi