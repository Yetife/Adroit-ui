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
            query: ({size, page, applicationId, statusName, startDate, endDate }) => {
                const queryParams = {
                    PasgeSize: size,
                    PageNumber: page,
                    det: startDate ? 1 : 2,
                    // Add optional parameters conditionally
                    ...(startDate && { StartDate: startDate }),
                    ...(endDate && { EndDate: endDate }),
                    ...(applicationId && { ApplicationId: applicationId }),
                    ...(statusName && { Status: statusName }),

                };
                return {
                    url: `/Administration/StaffLoan/GetStaffLoan`,
                    params: queryParams,
                };
            },
            providesTags: ["AddStaffLoan"]
        }),
        getLoanById: builder.query({
            query:(id)=>({
                url:`/StaffLoan/ViewStaffLoan/${id}`,
                method:"GET"
            }),
            invalidatesTags:[]
        }),
        updateStaffLoan: builder.mutation({
            query: ({body}) => ({
                url: `/StaffLoan/UpdateStaffLoanApprovalStatus`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["UpdateStaffLoan"]
        }),
    })
})

export const {
    useAddStaffLoanMutation,
    useGetAllStaffLoanQuery,
    useGetLoanByIdQuery,
} = staffLoanApi