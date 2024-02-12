import {createSlice} from "@reduxjs/toolkit";
import {getDocumentation} from "../services/api/authApiService.js";

export const documentationSlice = createSlice({
    name: "documentation",
    initialState: {
        allDoc: [],
        loading: false,
        totalCount: 0,
    },

    reducers: {
        fetchDoc: (state, action) => {
            state.allDoc = action.payload;
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
    fetchDoc, fetchCount, getLoading
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

export default documentationSlice.reducer