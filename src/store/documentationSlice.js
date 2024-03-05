import {createSlice} from "@reduxjs/toolkit";
import {getDocumentation, getProcessedDisbursement} from "../services/api/authApiService.js";

export const documentationSlice = createSlice({
    name: "documentation",
    initialState: {
        allDoc: [],
        allProcessed: [],
        loading: false,
        totalCount: 0,
    },

    reducers: {
        fetchDoc: (state, action) => {
            state.allDoc = action.payload;
        },
        fetchProcessedDisbursement: (state, action) => {
            state.allProcessed = action.payload;
        },
        fetchCount: (state, action) => {
            state.totalCount = action.payload;
        },
        getLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const {
    fetchDoc, fetchCount, fetchProcessedDisbursement, getLoading
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

export default documentationSlice.reducer