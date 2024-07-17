import { createSlice } from '@reduxjs/toolkit';
import { MaintenanceDetailsSliceSchema } from '../types/maintenanceDetailsSlice';

const initialState: MaintenanceDetailsSliceSchema = {

};

export const MaintenanceDetailsSlice = createSlice({
    name: 'MaintenanceDetailsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //builder
        //.addCase(loginByUsername.pending, (state) => {
        //    state.error = undefined
        //    state.isLoading = true
        //})
        //.addCase(loginByUsername.fulfilled, (state) => {
        //    state.isLoading = false
        //})
        //.addCase(loginByUsername.rejected, (state, action) => {
        //    state.isLoading = false
        //    state.error = action.payload
        //})
    }
});

// Action creators are generated for each case reducer function
export const { actions: MaintenanceDetailsSliceActions } = MaintenanceDetailsSlice;
export const { reducer: MaintenanceDetailsSliceReducer } = MaintenanceDetailsSlice;
