import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const bridgeLoanApi = createApi({
    reducerPath: "bridgeLoanApi",
    baseQuery: customFetchBase,
    tagTypes:["AddDocumentSetup", "EditDocumentSetup", "AddDocumentStatus", "EditDocumentStatus", "AddFacilityType", "DelFacilityType", "EditFacilityType",
        "AddTenor", "DelTenor", "EditTenor", "AddDocumentationStage", "DelDocumentationStage", "EditDocumentationStage", "AddDisbursementStatus", "DelDisbursementStatus",
        "EditDisbursementStatus", "AddDocumentation", "EditDocumentation", "AddDisbursement", "ReturnDisbursement"],
    endpoints: (builder) => ({
        addDocumentSetup: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/DocumentSetUp/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddDocumentSetup"]
        }),
        getAllValidDocumentSetup: builder.query({
            query: ({size, page, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    // Add optional parameters conditionally
                    ...(searchTerm && { SearchName: searchTerm }),
                };

                return {
                    url: `/BridgeLoan/DocumentSetUp/getallvalid`,
                    params: queryParams,
                };
            },
            providesTags: ["AddDocumentSetup", "EditDocumentSetup"]
        }),
        editDocumentSetup: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/DocumentSetUp/update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["EditDocumentSetup"]
        }),
        addDocumentStatus: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/DocumentationStatus/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddDocumentStatus"]
        }),
        getAllValidDocumentStatus: builder.query({
            query: () => ({
                url: `/BridgeLoan/DocumentationStatus/getallvalid`,
            }),
            providesTags: ["AddDocumentStatus", "EditDocumentStatus"]
        }),
        editDocumentStatus: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/DocumentationStatus/update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["EditDocumentStatus"]
        }),
        addDocumentation: builder.mutation({
            query: (formData) => ({
                url: `/BridgeLoan/Documentation/add`,
                method: "POST",
                body: formData
            }),
            invalidatesTags: ["AddDocumentation"]
        }),
        getAllValidDocumentation: builder.query({
            query: () => ({
                url: `/BridgeLoan/Documentation/getallvalid`,
            }),
            providesTags: ["AddDocumentation", "EditDocumentation"]
        }),
        editDocumentation: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/Documentation/update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["EditDocumentation"]
        }),
        addDisbursement: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/Disbursement/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddDisbursement"]
        }),
        returnDisbursement: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/Disbursement/return`,
                method: "POST",
                body
            }),
            invalidatesTags: ["ReturnDisbursement"]
        }),
        getAllProcessedDisbursement: builder.query({
            query: ({size, page, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: 2,
                    ...(searchTerm && { SearchName: searchTerm }),
                };
                return {
                    url: `/BridgeLoan/Disbursement/getprocessed`,
                    params: queryParams,
                };
            },
            providesTags: ["AddDisbursement", "ReturnDisbursement"]
        }),
        getAllReturnedDisbursement: builder.query({
            query: ({size, page, searchTerm}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    ...(searchTerm && { SearchName: searchTerm }),
                };
                return {
                    url: `/BridgeLoan/Disbursement/getreturned`,
                    params: queryParams,
                };
            },
            providesTags: ["AddDisbursement", "ReturnDisbursement"]
        }),
        getAllDisbursedDisbursement: builder.query({
            query: ({size, page, searchTerm, startDate}) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    ...(searchTerm && { SearchName: searchTerm }),
                    ...(startDate && { StartDate: startDate }),
                };
                return {
                    url: `/BridgeLoan/Disbursement/getdisbursed`,
                    params: queryParams,
                };
            },
            providesTags: ["AddDisbursement", "ReturnDisbursement"]
        }),
        addTenor: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/GeneralSetUpTenor/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddTenor"]
        }),
        getAllValidTenor: builder.query({
            query: () => ({
                url: `/BridgeLoan/GeneralSetUpTenor/getallvalid`,
            }),
            providesTags: ["AddTenor", "DelTenor", "EditTenor"]
        }),
        deleteTenor: builder.mutation({
            query:(id)=>({
                url:`/BridgeLoan/GeneralSetUpTenor/deletebyuniqueid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelTenor"]
        }),
        editTenor: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/GeneralSetUpTenor/Update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["EditTenor"]
        }),
        addFacilityType: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/GeneralSetUpFacilityType/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddFacilityType"]
        }),
        getAllValidFacilityType: builder.query({
            query: () => ({
                url: `/BridgeLoan/GeneralSetUpFacilityType/getallvalid`,
            }),
            providesTags: ["AddFacilityType", "DelFacilityType", "EditFacilityType"]
        }),
        deleteFacilityType: builder.mutation({
            query:(id)=>({
                url:`/BridgeLoan/GeneralSetUpFacilityType/deletebyuniqueid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelFacilityType"]
        }),
        editFacilityType: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/GeneralSetUpFacilityType/Update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["EditFacilityType"]
        }),
        addDocumentationStage: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/GeneralSetUpDocumentationStage/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddDocumentationStage"]
        }),
        getAllValidDocumentationStage: builder.query({
            query: () => ({
                url: `/BridgeLoan/GeneralSetUpDocumentationStage/getallvalid`,
            }),
            providesTags: ["AddDocumentationStage", "DelDocumentationStage", "EditDocumentationStage"]
        }),
        deleteDocumentationStage: builder.mutation({
            query:(id)=>({
                url:`/BridgeLoan/GeneralSetUpDocumentationStage/deletebyuniqueid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelDocumentationStage"]
        }),
        editDocumentationStage: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/GeneralSetUpDocumentationStage/Update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["EditDocumentationStage"]
        }),
        addDisbursementStatus: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/GeneralSetUpDisbursementStatus/add`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddDisbursementStatus"]
        }),
        getAllValidDisbursementStatus: builder.query({
            query: () => ({
                url: `/BridgeLoan/GeneralSetUpDisbursementStatus/getallvalid`,
            }),
            providesTags: ["AddDisbursementStatus", "DelDisbursementStatus", "EditDisbursementStatus"]
        }),
        deleteDisbursementStatus: builder.mutation({
            query:(id)=>({
                url:`/BridgeLoan/GeneralSetUpDisbursementStatus/deletebyuniqueid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelDisbursementStatus"]
        }),
        editDisbursementStatus: builder.mutation({
            query: ({body}) => ({
                url: `/BridgeLoan/GeneralSetUpDisbursementStatus/Update`,
                method: "POST",
                body
            }),
            invalidatesTags: ["EditDisbursementStatus"]
        }),
    })
})

export const {
    useAddDocumentSetupMutation,
    useGetAllValidDocumentSetupQuery,
    useEditDocumentSetupMutation,
    useAddDocumentStatusMutation,
    useGetAllValidDocumentStatusQuery,
    useEditDocumentStatusMutation,
    useAddDocumentationMutation,
    useGetAllValidDocumentationQuery,
    useEditDocumentationMutation,
    useAddDisbursementMutation,
    useGetAllProcessedDisbursementQuery,
    useGetAllReturnedDisbursementQuery,
    useGetAllDisbursedDisbursementQuery,
    useReturnDisbursementMutation,
    useAddTenorMutation,
    useGetAllValidTenorQuery,
    useDeleteTenorMutation,
    useEditTenorMutation,
    useAddFacilityTypeMutation,
    useGetAllValidFacilityTypeQuery,
    useDeleteFacilityTypeMutation,
    useEditFacilityTypeMutation,
    useAddDocumentationStageMutation,
    useGetAllValidDocumentationStageQuery,
    useDeleteDocumentationStageMutation,
    useEditDocumentationStageMutation,
    useAddDisbursementStatusMutation,
    useGetAllValidDisbursementStatusQuery,
    useDeleteDisbursementStatusMutation,
    useEditDisbursementStatusMutation,
} = bridgeLoanApi