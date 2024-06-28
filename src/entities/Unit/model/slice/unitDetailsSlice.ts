import { createSlice } from '@reduxjs/toolkit';
import { UnitDetailsSliceInterface } from '../types/unitDetailsTypes';

const initialState: UnitDetailsSliceInterface = {
    error:'',
    unit: {},
    isLoading: false,
};

export const UnitDetailsSlice = createSlice({
    name: 'UnitDetailsSlice',
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
export const { actions: UnitDetailsSliceActions } = UnitDetailsSlice;
export const { reducer: UnitDetailsSliceReducer } = UnitDetailsSlice;
