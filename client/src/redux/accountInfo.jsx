
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    opensi: false,
};

const accountinfo = createSlice({
    name: 'accountinfo',
    initialState,
    reducers: {
        openAccountInfo: (state, action) => {
            state.opensi = true;
        },
        closeAccountInfo: (state) => {
            state.opensi = false;
        }
    }
});


export const { openAccountInfo, closeAccountInfo } = accountinfo.actions;

export default accountinfo.reducer;