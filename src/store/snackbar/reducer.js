import {createSlice} from '@reduxjs/toolkit';

export const snackStatus = createSlice({
    name: "snackbar",
    initialState: {
        success: false,
        display: false,
        message: ''
    },
    reducers: {
        updateSnackbar: (state, action) => {
            switch (action.payload.type) {
                case "TOGGLE_SNACKBAR_OPEN": {
                    return {
                        ...state,
                        display: true,
                        success:action.payload.success,
                        message: action.payload.message,
                    };
                }

                case "TOGGLE_SNACKBAR_CLOSE": {
                    return {
                        ...state,
                        display: false,
                    };
                }

                default: {
                    return state;
                }
            }
        }
    }
})

//keep adding the reducers' status to make them available globally
export const {updateSnackbar} = snackStatus.actions;

export default snackStatus.reducer;