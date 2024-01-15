import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../services/api/customFetchBaseQuery.js";

export const staffLoanApi = createApi({
    reducerPath: "staffLoanApi",
    baseQuery: customFetchBase,
    tagTypes: ["AddStaffLoan", "EditStatus"],
    endpoints: (builder) => ({
        addStaffLoan: builder.mutation({
            query: ({body}) => ({
                url: `/StaffLoan/addStaffLoan`,
                method: "POST",
                body
            }),
            invalidatesTags: ["AddStaffLoan"]
        }),
        getAllStaffLoan: builder.query({
            query: () => ({
                url: `/Administration/StaffLoan/GetStaffLoan`,
            }),
            providesTags: ["AddStaffLoan"]
        }),
        getLoanById: builder.query({
            query:(id)=>({
                url:`/StaffLoan/ViewStaffLoan/${id}`,
                method:"GET"
            }),
            invalidatesTags:[]
        }),
    })
})

export const {
    useAddStaffLoanMutation,
    useGetAllStaffLoanQuery,
    useGetLoanByIdQuery,
} = staffLoanApi