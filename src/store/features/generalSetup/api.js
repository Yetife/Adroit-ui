import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const generalSetUpApi = createApi({
    reducerPath: "generalSetupApi",
    baseQuery: customFetchBase,
    tagTypes: ["AddBanks", "DelBank", "EditBank", "AddEducationLevel", "DelEducationalLevel", "EditEducationalLevel", "AddEmploymentTypes",
        "DelEmploymentType", "EditEmploymentType", "AddGender", "DelGender", "EditGender", "AddLga", "DelLga", "EditLga", "AddMaritalStatus",
        "DelMaritalStatus", "EditMaritalStatus", "AddDependents", "DelDependents", "EditDependent", "AddResidency", "DelResidency", "EditResidency",
        "AddOrganization", "DelOrganization", "EditOrganization", "AddResidentialStatus", "DelResidentialStatus", "EditResidentialStatus",
        "AddSalaryRange", "DelSalaryRange", "EditSalaryRange", "AddSalaryPaymentDay", "DelSalaryPaymentDay", "EditSalaryPaymentDay", "AddState",
        "DelState", "EditState", "AddTitle", "DelTitle", "EditTitle", "AddCountry", "DelCountry", "EditCountry"],

    endpoints: (builder) => ({
        addBanks: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addbanks`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddBanks"]
        }),
        getAllValidBanks: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidbanks`,
            }),
            providesTags: ["AddBanks", "DelBank", "EditBank"]
        }),
        deleteBank: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deletebankbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelBank"]
        }),
        editBank: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateBank`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditBank"]
        }),
        addEducationalLevel: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addeducationallevels`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddEducationalLevel"]
        }),
        getAllEducationalLevel: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidEducationalLevels`,
            }),
            providesTags: ["AddEducationLevel", "DelEducationalLevel", "EditEducationalLevel"]
        }),
        deleteEducationalLevel: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteEducationalLevelbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelEducationalLevel"]
        }),
        editEducationalLevel: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateEducationalLevel`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditEducationalLevel"]
        }),
        addEmploymentSector: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addEmploymentSector`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddEmploymentSector"]
        }),
        getAllEmploymentSectors: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidEmploymentSector`,
            }),
            providesTags: ["AddEmploymentSector", "DelEmploymentSector", "EditEmploymentSector"]
        }),
        deleteEmploymentSector: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteEmploymentSectorbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelEmploymentSector"]
        }),
        editEmploymentSector: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateEmploymentSector`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditEmploymentSector"]
        }),
        addEmploymentType: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addEmploymenttypes`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddEmploymentTypes"]
        }),
        getAllEmploymentTypes: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidEmploymenttypes`,
            }),
            providesTags: ["AddEmploymentTypes", "DelEmploymentType", "EditEmploymentType"]
        }),
        deleteEmploymentType: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteEmploymenttypebyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelEmploymentType"]
        }),
        editEmploymentType: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateEmploymenttype`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditEmploymentType"]
        }),
        addGender: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addGenders`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddGender"]
        }),
        getAllGenders: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidGenders`,
            }),
            providesTags: ["AddGender", "DelGender", "EditGender"]
        }),
        deleteGender: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteGenderbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelGender"]
        }),
        editGender: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateGender`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditGender"]
        }),
        addLga: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addLgas`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddLga"]
        }),
        getAllLga: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidLgas`,
            }),
            providesTags: ["AddLga", "DelLga", "EditLga"]
        }),
        deleteLga: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteLgabyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelLga"]
        }),
        editLga: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateLga`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditLga"]
        }),
        addMaritalStatus: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addMaritalstatuss`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddMaritalStatus"]
        }),
        getAllMaritalStatus: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidMaritalstatuss`,
            }),
            providesTags: ["AddMaritalStatus", "DelMaritalStatus", "EditMaritalStatus"]
        }),
        deleteMaritalStatus: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteMaritalstatusbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelMaritalStatus"]
        }),
        editMaritalStatus: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateMaritalstatus`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditMaritalStatus"]
        }),
        addDependents: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addNoofdependants`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddDependents"]
        }),
        getAllDependents: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidNoofdependants`,
            }),
            providesTags: ["AddDependents", "DelDependents", "EditDependent"]
        }),
        deleteDependents: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteNoofdependantbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelDependents"]
        }),
        editDependent: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateNoofdependant`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditDependent"]
        }),
        addResidency: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addNoofdependants`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddResidency"]
        }),
        getAllResidency: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidNoofdependants`,
            }),
            providesTags: ["AddResidency", "DelResidency", "EditResidency"]
        }),
        deleteResidency: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteNoofdependantbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelResidency"]
        }),
        editResidency: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateNoofdependant`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditResidency"]
        }),
        addOrganization: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addOrganizations`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddOrganization"]
        }),
        getAllOrganization: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidOrganizations`,
            }),
            providesTags: ["AddOrganization", "DelOrganization", "EditOrganization"]
        }),
        deleteOrganization: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteOrganizationbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelOrganization"]
        }),
        editOrganization: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateOrganization`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditOrganization"]
        }),
        addResidentialStatus: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addResidentialstatuss`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddResidentialStatus"]
        }),
        getAllResidentialStatus: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidResidentialstatuss`,
            }),
            providesTags: ["AddResidentialStatus", "DelResidentialStatus", "EditResidentialStatus"]
        }),
        deleteResidentialStatus: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteResidentialstatusbyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelResidentialStatus"]
        }),
        editResidentialStatus: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateResidentialstatus`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditResidentialStatus"]
        }),
        addSalaryRange: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addSalaryranges`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddSalaryRange"]
        }),
        getAllSalaryRange: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidSalaryranges`,
            }),
            providesTags: ["AddSalaryRange", "DelSalaryRange", "EditSalaryRange"]
        }),
        deleteSalaryRange: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteSalaryrangebyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelSalaryRange"]
        }),
        editSalaryRange: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateSalaryrange`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditSalaryRange"]
        }),
        addSalaryPaymentDay: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addSalarypaymentdates`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddSalaryPaymentDay"]
        }),
        getAllSalaryPaymentDay: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidSalarypaymentdates`,
            }),
            providesTags: ["AddSalaryPaymentDay", "DelSalaryPaymentDay", "EditSalaryPaymentDay"]
        }),
        deleteSalaryPaymentDay: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteSalarypaymentdatebyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelSalaryPaymentDay"]
        }),
        editSalaryPaymentDay: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateSalarypaymentdate`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditSalaryPaymentDay"]
        }),
        addState: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addStates`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddState"]
        }),
        getAllState: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidStates`,
            }),
            providesTags: ["AddState", "DelState", "EditState"]
        }),
        deleteState: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteStatebyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelState"]
        }),
        editState: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateState`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditState"]
        }),
        addTitle: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addTitles`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddTitle"]
        }),
        getAllTitle: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidTitles`,
            }),
            providesTags: ["AddTitle", "DelTitle", "EditTitle"]
        }),
        deleteTitle: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteTitlebyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelTitle"]
        }),
        editTitle: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateTitle`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditTitle"]
        }),
        addCountry: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/addCountry`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddCountry"]
        }),
        getAllCountry: builder.query({
            query: () => ({
                url: `/GeneralSetUp/getallvalidCountry`,
            }),
            providesTags: ["AddCountry", "DelCountry", "EditCountry"]
        }),
        deleteCountry: builder.mutation({
            query:(id)=>({
                url:`/GeneralSetUp/deleteCountrybyid/id?id=${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["DelCountry"]
        }),
        editCountry: builder.mutation({
            query: ({body}) => ({
                url: `/GeneralSetUp/updateCountry`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["EditCountry"]
        }),
    })
})

export const {
    useAddBanksMutation,
    useGetAllValidBanksQuery,
    useDeleteBankMutation,
    useEditBankMutation,
    useAddEducationalLevelMutation,
    useGetAllEducationalLevelQuery,
    useDeleteEducationalLevelMutation,
    useEditEducationalLevelMutation,
    useAddEmploymentTypeMutation,
    useGetAllEmploymentTypesQuery,
    useDeleteEmploymentTypeMutation,
    useEditEmploymentTypeMutation,
    useAddEmploymentSectorMutation,
    useGetAllEmploymentSectorsQuery,
    useDeleteEmploymentSectorMutation,
    useEditEmploymentSectorMutation,
    useAddGenderMutation,
    useGetAllGendersQuery,
    useDeleteGenderMutation,
    useEditGenderMutation,
    useAddLgaMutation,
    useGetAllLgaQuery,
    useDeleteLgaMutation,
    useEditLgaMutation,
    useAddMaritalStatusMutation,
    useGetAllMaritalStatusQuery,
    useDeleteMaritalStatusMutation,
    useEditMaritalStatusMutation,
    useAddDependentsMutation,
    useGetAllDependentsQuery,
    useDeleteDependentsMutation,
    useEditDependentMutation,
    useAddResidencyMutation,
    useGetAllResidencyQuery,
    useDeleteResidencyMutation,
    useEditResidencyMutation,
    useAddOrganizationMutation,
    useGetAllOrganizationQuery,
    useDeleteOrganizationMutation,
    useEditOrganizationMutation,
    useAddResidentialStatusMutation,
    useGetAllResidentialStatusQuery,
    useDeleteResidentialStatusMutation,
    useEditResidentialStatusMutation,
    useAddSalaryRangeMutation,
    useGetAllSalaryRangeQuery,
    useDeleteSalaryRangeMutation,
    useEditSalaryRangeMutation,
    useAddSalaryPaymentDayMutation,
    useGetAllSalaryPaymentDayQuery,
    useDeleteSalaryPaymentDayMutation,
    useEditSalaryPaymentDayMutation,
    useAddStateMutation,
    useGetAllStateQuery,
    useDeleteStateMutation,
    useEditStateMutation,
    useAddTitleMutation,
    useGetAllTitleQuery,
    useDeleteTitleMutation,
    useEditTitleMutation,
    useAddCountryMutation,
    useGetAllCountryQuery,
    useDeleteCountryMutation,
    useEditCountryMutation,
} = generalSetUpApi