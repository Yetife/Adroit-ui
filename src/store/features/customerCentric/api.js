import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const customerCentricApi = createApi({
    reducerPath: "customerCentricApi",
    baseQuery: customFetchBase,
    tagTypes: [],
    endpoints: (builder) => ({
        getAllSavings: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getallSavings`,
                    params: queryParams,
                };
            },
            providesTags: []
        }),
        getSavingsById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetSavingsByCusId/${id}`,
            }),
            providesTags: []
        }),
        getAllFixedDeposit: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getallfixeddeposits`,
                    params: queryParams,
                };
            },
            providesTags: ["searchFixedDeposit", "modifyFixedDeposit"]
        }),
        getFixedDepositById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetfixeddepositByCusId/${id}`,
            }),
            providesTags: ["modifyFixedDeposit"]
        }),
        searchFixedDeposit: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/getallfixeddepositsForFilter`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["searchFixedDeposit"]
        }),
        modifyFixedDeposit: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/ModifyfixeddepositsWithReferenceId`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["modifyFixedDeposit"]
        }),
        getAllBillsPayment: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };
                return {
                    url: `/CustomerCentric/getallbillspayments`,
                    params: queryParams,
                };
            },
            providesTags: []
        }),
        getBillsPaymentById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetbillspaymentByCusId/${id}`,
            }),
            providesTags: ["modifyBillsPayment"]
        }),
        modifyBillsPayment: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/ModifybillsPaymentsStatusWithTransactionReference`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["modifyBillsPayment"]
        }),
        getAllTransfers: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getalltransfers`,
                    params: queryParams,
                };
            },
            providesTags: []
        }),
        getTransferById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GettransferByCusId/${id}`,
            }),
            providesTags: ["modifyTransfer"]
        }),
        modifyTransfer: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/ModifytransferStatusWithTransactionReference`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["modifyTransfer"]
        }),
        getAllAirtime: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getallairtimes`,
                    params: queryParams,
                };
            },
            providesTags: []
        }),
        getAirtimeById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetairtimeByCusId/${id}`,
            }),
            providesTags: []
        }),
        modifyAirtime: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/ModifyairtimePaymentsStatusWithTransactionReference`,
                method: "PUT",
                body
            }),
            invalidatesTags: [" modifyAirtime"]
        }),
        getAllData: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getalldatas`,
                    params: queryParams,
                };
            },
            providesTags: []
        }),
        getDataById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetdataByCusId/${id}`,
            }),
            providesTags: []
        }),
        modifyData: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/ModifydataPaymentsStatusWithTransactionReference`,
                method: "PUT",
                body
            }),
            invalidatesTags: [" modifyData"]
        }),
        getAllP2P: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getallp2ps`,
                    params: queryParams,
                };
            },
            providesTags: []
        }),
        getP2PById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/Getp2pByP2PLoanRequestId/${id}`,
            }),
            providesTags: ["updateRepayment"]
        }),
        updateRepayment: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/Updatep2pById/${body.id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["updateRepayment"]
        }),
        getAllEscrow: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getallescrows`,
                    params: queryParams,
                };
            },
            providesTags: ["modifyEscrow"]
        }),
        modifyEscrow: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/ModifyescrowPaymentsStatusWithTransactionReference`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["modifyEscrow"]
        }),
        getAllLoanBidding: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getallloanbiddings`,
                    params: queryParams,
                };
            },
            providesTags: []
        }),
        getLoanBiddingById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetloanbiddingByLoanOfferId/${id}`,
            }),
            providesTags: []
        }),
        getAllLoanRepayment: builder.query({
            query: ({size, page, dropDown, searchTerm, statusName, startDate, endDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(statusName && { Status: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getallloanRepayment`,
                    params: queryParams,
                };
            },
            providesTags: []
        }),
        getLoanRepaymentById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetloanRepaymentByCusId/${id}`,
            }),
            providesTags: ["modifyTransfer"]
        }),
        getLoanRepaymentPlan: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetRepaymentPlanByCusId/${id}`,
            }),
            providesTags: ["manualRepayment","updateRepaymentLateFee"]
        }),
        updateRepaymentLateFee: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/UpdateRepaymentCloseLateFee`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["updateRepaymentLateFee"]
        }),
        manualRepayment: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/ManualRepayment`,
                method: "POST",
                body
            }),
            invalidatesTags: ["manualRepayment"]
        }),
        manuallyRepay: builder.mutation({
            query: ({body}) => ({
                url: `/Disbursement/ManualDisbursement`,
                method: "POST",
                body
            }),
            invalidatesTags: ["manuallyRepay"]
        }),
    })
})

export const {
    useGetAllSavingsQuery,
    useGetSavingsByIdQuery,
    useGetAllFixedDepositQuery,
    useGetFixedDepositByIdQuery,
    useGetAllBillsPaymentQuery,
    useGetBillsPaymentByIdQuery,
    useGetAllTransfersQuery,
    useGetTransferByIdQuery,
    useGetAllAirtimeQuery,
    useGetAirtimeByIdQuery,
    useGetAllDataQuery,
    useGetDataByIdQuery,
    useModifyFixedDepositMutation,
    useModifyBillsPaymentMutation,
    useSearchFixedDepositMutation,
    useModifyTransferMutation,
    useModifyAirtimeMutation,
    useModifyDataMutation,
    useGetAllP2PQuery,
    useGetP2PByIdQuery,
    useUpdateRepaymentMutation,
    useGetAllLoanBiddingQuery,
    useGetLoanBiddingByIdQuery,
    useGetAllLoanRepaymentQuery,
    useGetLoanRepaymentByIdQuery,
    useGetLoanRepaymentPlanQuery,
    useGetAllEscrowQuery,
    useModifyEscrowMutation,
    useManualRepaymentMutation,
    useManuallyRepayMutation,
    useUpdateRepaymentLateFeeMutation,
} = customerCentricApi