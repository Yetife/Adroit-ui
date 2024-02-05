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
            query: ({size, page}) => ({
                url: `/CustomerCentric/getallfixeddeposits?PasgeSize=${size}&PageNumber=${page}`,
            }),
            providesTags: []
        }),
        getFixedDepositById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetfixeddepositByCusId/${id}`,
            }),
            providesTags: []
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
            providesTags: []
        }),
        getAllTransfers: builder.query({
            query: () => ({
                url: `/CustomerCentric/getalltransfers`,
            }),
            providesTags: []
        }),
        getTransferById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GettransferByCusId/${id}`,
            }),
            providesTags: []
        }),
        getAllAirtime: builder.query({
            query: () => ({
                url: `/CustomerCentric/getallairtimes`,
            }),
            providesTags: []
        }),
        getAirtimeById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetairtimeByCusId/${id}`,
            }),
            providesTags: []
        }),
        getAllData: builder.query({
            query: () => ({
                url: `/CustomerCentric/getalldatas`,
            }),
            providesTags: []
        }),
        getDataById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetdataByCusId/${id}`,
            }),
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

} = customerCentricApi