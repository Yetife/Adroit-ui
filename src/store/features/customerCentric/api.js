import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const customerCentricApi = createApi({
    reducerPath: "customerCentricApi",
    baseQuery: customFetchBase,
    tagTypes: [],
    endpoints: (builder) => ({
        getAllSavings: builder.query({
            query: ({size, page}) => ({
                url: `/CustomerCentric/getallSavings?PasgeSize=${size}&PageNumber=${page}`,
            }),
            providesTags: []
        }),
        getSavingsById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetSavingsByCusId/${id}`,
            }),
            providesTags: []
        }),
        getAllFixedDeposit: builder.query({
            query: ({size, page, dropDown, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    // Add optional parameters conditionally
                    ...(dropDown && { SearchType: dropDown }),
                    ...(searchTerm && { SearchName: searchTerm }),
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
            query: ({size, page}) => ({
                url: `/CustomerCentric/getallbillspayments?PasgeSize=${size}&PageNumber=${page}`,
            }),
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
            query: ({size, page}) => ({
                url: `/CustomerCentric/getalltransfers?PasgeSize=${size}&PageNumber=${page}`,
            }),
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
            query: ({size, page}) => ({
                url: `/CustomerCentric/getallairtimes?PasgeSize=${size}&PageNumber=${page}`,
            }),
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
            query: ({size, page}) => ({
                url: `/CustomerCentric/getalldatas?PasgeSize=${size}&PageNumber=${page}`,
            }),
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
} = customerCentricApi