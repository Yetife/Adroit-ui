import {createSlice} from "@reduxjs/toolkit";
import {
    filterDisbursedDisbursement,
    getDisbursedDisbursement,
    getDocumentation, getLoanTopUpDetails,
    getProcessedDisbursement
} from "../services/api/authApiService.js";

export const documentationSlice = createSlice({
    name: "documentation",
    initialState: {
        allDoc: [],
        allProcessed: [],
        allDisbursed: [],
        loading: false,
        totalCount: 0,
        topUpDetail: {}
    },

    reducers: {
        fetchDoc: (state, action) => {
            state.allDoc = action.payload;
        },
        fetchProcessedDisbursement: (state, action) => {
            state.allProcessed = action.payload;
        },
        fetchDisbursedDisbursement: (state, action) => {
            state.allDisbursed = action.payload;
        },
        fetchCount: (state, action) => {
            state.totalCount = action.payload;
        },
        fetchTopUpDetail: (state, action) => {
            state.topUpDetail = action.payload;
        },
        getLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const {
    fetchDoc, fetchCount,
    fetchProcessedDisbursement, fetchDisbursedDisbursement,
    getLoading, fetchTopUpDetail
} = documentationSlice.actions;

export const fetchDocumentation = (size, page) => async (dispatch) => {
    try {
        dispatch(getLoading(true));
        const res = await getDocumentation(size, page);
        dispatch(fetchDoc(res.data))
        dispatch(fetchCount(res.recordCount))
        dispatch(getLoading(false));
    }catch (e) {
        dispatch(getLoading(false));
    }
}
export const fetchProcessed = () => async (dispatch) => {
    try {
        dispatch(getLoading(true));
        const res = await getProcessedDisbursement();
        dispatch(fetchProcessedDisbursement(res.data))
        dispatch(getLoading(false));
    }catch (e) {
        dispatch(getLoading(false));
    }
}
export const fetchDisbursed = (size, page) => async (dispatch) => {
    try {
        dispatch(getLoading(true));
        const res = await getDisbursedDisbursement(size, page);
        dispatch(fetchDisbursedDisbursement(res.data))
        dispatch(fetchCount(res.recordCount))
        dispatch(getLoading(false));
    }catch (e) {
        dispatch(getLoading(false));
    }
}
export const fetchFilterDisbursed = (startDate, bvn) => async (dispatch) => {
    try {
        dispatch(getLoading(true));
        const res = await filterDisbursedDisbursement(startDate, bvn);
        dispatch(fetchDisbursedDisbursement(res.data))
        dispatch(fetchCount(res.recordCount))
        dispatch(getLoading(false));
    }catch (e) {
        dispatch(getLoading(false));
    }
}
export const fetchTopUpLoanDetails = (id) => async (dispatch) => {
    try {
        dispatch(getLoading(true));
        const res = await getLoanTopUpDetails(id);
        dispatch(fetchTopUpDetail(res))
        dispatch(getLoading(false));
    }catch (e) {
        dispatch(getLoading(false));
    }
}
export default documentationSlice.reducer