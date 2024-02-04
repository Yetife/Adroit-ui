import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const customerCentricApi = createApi({
    reducerPath: "customerCentricApi",
    baseQuery: customFetchBase,
    tagTypes: [],
    endpoints: (builder) => ({
        getAllSavings: builder.query({
            query: () => ({
                url: `/CustomerCentric/getallSavings`,
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
            query: () => ({
                url: `/CustomerCentric/getallfixeddeposits`,
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
            query: () => ({
                url: `/CustomerCentric/getallbillspayments`,
            }),
            providesTags: []
        }),
        getBillsPaymentById: builder.query({
            query: (id) => ({
                url: `/CustomerCentric/GetbillspaymentByCusId/${id}`,
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
} = customerCentricApi