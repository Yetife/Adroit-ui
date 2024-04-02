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
            providesTags: ["completeReview", "declineApplication"]
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
        getAllAdjustRestructure: builder.query({
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
                    url: `/LoanApplication/Adjust/getbyloantype`,
                    params: queryParams,
                };
            },
            providesTags: ["completeReview", "declineApplication"]
        }),
        getAllAdjustTopUp: builder.query({
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
                    url: `/LoanApplication/Adjust/getbyloantype`,
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
        getAllDeclinedRestructure: builder.query({
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
                    url: `/LoanApplication/Declined/getbyloantype`,
                    params: queryParams,
                };
            },
            providesTags: ["declineApplication"]
        }),
        getAllDeclinedTopUp: builder.query({
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
                    url: `/LoanApplication/Declined/getbyloantype`,
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
            providesTags: ["approveApplication"]
        }),

        getAllApprovalRestructure: builder.query({
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
                    url: `Approval/getbyloantype`,
                    params: queryParams,
                };
            },
            providesTags: ["approveApplication"]
        }),
        getAllApprovalTopUp: builder.query({
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
                    url: `Approval/getbyloantype`,
                    params: queryParams,
                };
            },
            providesTags: ["approveApplication"]
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
            providesTags: ["returnApplication", "adjustApplication", "completeReview", "declineApplication", "approveApplication"]
        }),

        getAllReviewStructure: builder.query({
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
                    url: `/LoanUnderwriting/Review/getbyloantype`,
                    params: queryParams,
                };
            },
            providesTags: ["returnApplication", "adjustApplication", "completeReview", "declineApplication", "approveApplication"]
        }),

        getAllReviewTopUp: builder.query({
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
                    url: `/LoanUnderwriting/Review/getbyloantype`,
                    params: queryParams,
                };
            },
            providesTags: ["returnApplication", "adjustApplication", "completeReview", "declineApplication", "approveApplication"]
        }),
        getAllLoanRestructuring: builder.query({
            query: ({size, page, bvn, statusName, email,  customerRef, startDate, endDate }) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(bvn && { Bvn: bvn }),
                    ...(statusName && { Status: statusName }),
                    ...(email && { EmailAddress: email }),
                    ...(customerRef && { CustomerReference: customerRef }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                    // ...filters
                };
                return {
                    url: `LoanRestructuring/get`,
                    params: queryParams,
                };
            },
            providesTags: ["updateLoanRestructure", "returnApplication",]
        }),
        getLoanRestructureDetail: builder.query({
            query: (id) => ({
                url: `/LoanRestructuring/ViewLoan/${id}`,
            }),
            providesTags: []
        }),
        updateLoanRestructure: builder.mutation({
            query: ({body}) => ({
                url: `/LoanRestructuring/Update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["updateLoanRestructure"]
        }),
        getAllLoanTopUp: builder.query({
            query: ({size, page, bvn, statusName, email,  customerRef, startDate, endDate }) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(bvn && { Bvn: bvn }),
                    ...(statusName && { Status: statusName }),
                    ...(email && { EmailAddress: email }),
                    ...(customerRef && { CustomerReference: customerRef }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                    // ...filters
                };
                return {
                    url: `LoanTopUp/get`,
                    params: queryParams,
                };
            },
            providesTags: ["updateLoanTopUp", "returnApplication",]
        }),
        getLoanTopUpDetail: builder.query({
            query: (id) => ({
                url: `/LoanTopUp/ViewLoan/${id}`,
            }),
            providesTags: []
        }),
        updateLoanTopUp: builder.mutation({
            query: ({body}) => ({
                url: `/LoanTopUp/Update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["updateLoanTopUp"]
        }),
        getLoanRepaymentDetail: builder.query({
            query: ({id, category}) => ({
                url: `/LoanApplication/Customer/getRepaymentDetails?LoanApplicationId=${id}&LoanCategory=${category}`,
            }),
            providesTags: []
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
    useGetAllAdjustTopUpQuery,
    useGetAllAdjustRestructureQuery,
    useGetAllDeclinedQuery,
    useGetAllDeclinedRestructureQuery,
    useGetAllDeclinedTopUpQuery,
    useGetCustomerDetailsQuery,
    useGetCustomerDataQuery,
    useGetAdjustCustomerDetailsQuery,
    useAddCommentMutation,
    useDeclineApplicationMutation,
    useCompleteReviewMutation,
    useRequestDocumentMutation,
    useReassignLoanMutation,
    useGetReassignedLoanQuery,
    useGetAllLoanRestructuringQuery,
    useGetAllLoanTopUpQuery,
    useGetAllReviewStructureQuery,
    useGetAllReviewTopUpQuery,
    useGetAllReviewQuery,
    useAdjustApplicationMutation,
    useReturnApplicationMutation,
    useGetLoanRestructureDetailQuery,
    useUpdateLoanRestructureMutation,
    useGetLoanTopUpDetailQuery,
    useUpdateLoanTopUpMutation,
    useApproveApplicationMutation,
    useGetAllApprovalQuery,
    useGetAllApprovalRestructureQuery,
    useGetAllApprovalTopUpQuery,
    useGetLoanRepaymentDetailQuery,

} = loanApplicationApi