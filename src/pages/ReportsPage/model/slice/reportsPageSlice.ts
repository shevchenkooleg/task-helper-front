import { createSlice } from '@reduxjs/toolkit';
import { ReportsPageSchema } from '../types/reportsPage';

const initialState: ReportsPageSchema = {
    error: '',
    report: [],
    _isInit: false,
    isLoading: false,
    reportPageSettings: ''
};

export const reportsPageSlice = createSlice({
    name: 'reportsPageSlice',
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
export const { actions: reportsPageSliceActions } = reportsPageSlice;
export const { reducer: reportsPageSliceReducer } = reportsPageSlice;
