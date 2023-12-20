import {createSlice} from "@reduxjs/toolkit";
import {getDocumentation} from "../services/api/authApiService.js";

export const documentationSlice = createSlice({
    name: "documentation",
    initialState: {
        allDoc: [],
        loading: false,
    },

    reducers: {
        fetchDoc: (state, action) => {
            state.allDoc = action.payload;
        },
        getLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const {
    fetchDoc, getLoading
} = documentationSlice.actions;

export const fetchDocumentation = () => async (dispatch) => {
    try {
        dispatch(getLoading(true));
        const res = await getDocumentation();
        dispatch(fetchDoc(res.data))
        dispatch(getLoading(false));
    }catch (e) {
        dispatch(getLoading(false));
    }
}

export default documentationSlice.reducer