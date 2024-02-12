import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const administrationApi = createApi({
    reducerPath: "administrationApi",
    baseQuery: customFetchBase,
    tagTypes: ["AddLoanTenor", "DelLoanTenor", "EditLoanTenor", "AddProduct","EditProduct", "DelProduct", "AddRegularLoanCharges", "DelRegularLoanCharges",
        "EditRegularLoanCharges", "AddManage", "DelManage", "EditManage", "AddLevel", "DelLevel", "EditLevel"],
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/AdminProduct/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddProduct"]
        }),
        getAllProducts: builder.query({
            query: ({size, page, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    ...(searchTerm && { SearchName: searchTerm }),
                };
                return {
                    url: `/Administration/AdminProduct/getall`,
                    params: queryParams,
                };
            },
            providesTags: ["AddProduct", "EditProduct", "DelProduct"]
        }),
        editProduct: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/AdminProduct/update`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditProduct"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/Administration/AdminProduct/deletebyid/id?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DelProduct"]
        }),
        addLoanTenor: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/LoanTenor/addLoanTenors`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddLoanTenor"]
        }),
        getAllValidLoanTenors: builder.query({
            query: () => ({
                url: `/Administration/LoanTenor/getallvalidLoanTenors`,
            }),
            providesTags: ["AddLoanTenor", "DelLoanTenor", "EditLoanTenor"]
        }),
        deleteLoanTenor: builder.mutation({
            query:(id)=>({
                url:`/Administration/LoanTenor/deleteLoanTenorbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelLoanTenor"]
        }),
        editLoanTenor: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/LoanTenor/updateLoanTenor`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditLoanTenor"]
        }),
        addLevel: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/UnderwriterLevel/addUnderwriterLevels`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddLevel"]
        }),
        getAllValidLevel: builder.query({
            query: () => ({
                url: `/Administration/UnderwriterLevel/getallvalidUnderwriterLevels`,
            }),
            providesTags: ["AddLevel", "DelLevel", "EditLevel"]
        }),
        deleteLevel: builder.mutation({
            query:(id)=>({
                url:`/Administration/UnderwriterLevel/deleteUnderwriterLevelbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelLevel"]
        }),
        editLevel: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/UnderwriterLevel/updateUnderwriterLevel`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditLevel"]
        }),
        addManage: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/Manage/addManage`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddManage"]
        }),
        getAllValidManage: builder.query({
            query: () => ({
                url: `/Administration/Manage/getallManage`,
            }),
            providesTags: ["AddManage", "DelManage", "EditManage"]
        }),
        deleteManage: builder.mutation({
            query:(id)=>({
                url:`/Administration/Manage/deleteManagebyuniqueid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelManage"]
        }),
        editManage: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/Manage/updateManage`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditManage"]
        }),
        addRegularLoanInterest: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/UnderRegularLoan/addRegularLoanInterestRate`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddRegularLoanInterest"]
        }),
        getAllRegularLoanInterest: builder.query({
            query: () => ({
                url: `/Administration/UnderRegularLoan/getallRegularLoanInterestRate`,
            }),
            providesTags: ["AddRegularLoanInterest", "DelRegularLoanInterest", "EditRegularLoanInterest"]
        }),
        deleteRegularLoanInterest: builder.mutation({
            query:(id)=>({
                url:`/Administration/UnderRegularLoan/deleteRegularLoanInterestRatebyuniqueid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelRegularLoanInterest"]
        }),
        editRegularLoanInterest: builder.mutation({
            query: ({body}) => ({
                url: `Administration/UnderRegularLoan/updateRegularLoanInterestRate`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditRegularLoanInterest"]
        }),
        addRegularLoanCharges: builder.mutation({
            query: ({body}) => ({
                url: `/Administration/UnderRegularLoan/addRegularLoanCharge`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddRegularLoanCharges"]
        }),
        getAllRegularLoanCharges: builder.query({
            query: () => ({
                url: `/Administration/UnderRegularLoan/getallRegularLoanCharge`,
            }),
            providesTags: ["AddRegularLoanCharges", "DelRegularLoanCharges", "EditRegularLoanCharges"]
        }),
        deleteRegularLoanCharges: builder.mutation({
            query:(id)=>({
                url:`/Administration/UnderRegularLoan/deleteRegularLoanChargebyuniqueid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelRegularLoanCharges"]
        }),
        editRegularLoanCharges: builder.mutation({
            query: ({body}) => ({
                url: `Administration/UnderRegularLoan/updateRegularLoanCharge`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditRegularLoanCharges"]
        }),
        getStaffLoan: builder.query({
            query: () => ({
                url: `/Administration/StaffLoan/GetStaffLoan`,
            }),
            providesTags: []
        }),
        getStaffLoanById: builder.query({
            query:(id)=>({
                url:`/Administration/StaffLoan/ViewStaffLoan/${id}`,
                method:"GET"
            }),
            invalidatesTags:[]
        }),
    })
})

export const {
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useGetAllProductsQuery,
    useAddLoanTenorMutation,
    useGetAllValidLoanTenorsQuery,
    useDeleteLoanTenorMutation,
    useEditLoanTenorMutation,
    useAddLevelMutation,
    useEditLevelMutation,
    useDeleteLevelMutation,
    useGetAllValidLevelQuery,
    useAddManageMutation,
    useEditManageMutation,
    useDeleteManageMutation,
    useGetAllValidManageQuery,
    useAddRegularLoanInterestMutation,
    useGetAllRegularLoanInterestQuery,
    useDeleteRegularLoanInterestMutation,
    useEditRegularLoanInterestMutation,
    useAddRegularLoanChargesMutation,
    useGetAllRegularLoanChargesQuery,
    useDeleteRegularLoanChargesMutation,
    useEditRegularLoanChargesMutation,
    useGetStaffLoanQuery,
    useGetStaffLoanByIdQuery,
} = administrationApi