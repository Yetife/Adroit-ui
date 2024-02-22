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
                    ...(statusName && { Stats: statusName }),
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
                    ...(statusName && { Stats: statusName }),
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                };

                return {
                    url: `/CustomerCentric/getallfixeddeposits`,
                    params: queryParams,
                };
            },
            providesTags: ["searchFixedDeposit"]
        }),
        getFixedDepositById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetfixeddepositByCusId/${id}`,
            }),
            providesTags: []
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
                    ...(statusName && { Stats: statusName }),
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
            query: ({size, page, dropDown, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
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
            providesTags: []
        }),
        modifyTransfer: builder.mutation({
            query: ({body}) => ({
                url: `/CustomerCentric/ModifytransferStatusWithTransactionReference`,
                method: "PUT",
                body
            }),
            invalidatesTags: [" modifyTransfer"]
        }),
        getAllAirtime: builder.query({
            query: ({size, page, dropDown, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
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
            query: ({size, page, dropDown, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
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
            query: ({size, page}) => ({
                url: `/CustomerCentric/getallp2ps?PasgeSize=${size}&PageNumber=${page}`,
            }),
            providesTags: []
        }),
        getP2PById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/Getp2pByP2PLoanRequestId/${id}`,
            }),
            providesTags: []
        }),
        getAllEscrow: builder.query({
            query: ({size, page, dropDown, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
                };

                return {
                    url: `/CustomerCentric/getallescrows`,
                    params: queryParams,
                };
            },
            providesTags: []
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
    useGetAllEscrowQuery,
} = customerCentricApi