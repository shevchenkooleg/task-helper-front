import { createSlice } from '@reduxjs/toolkit';
import { StructurePageSchema } from '../types/structurePage';

const initialState: StructurePageSchema = {
    error: '',
    isLoading: false,
    units: [],
};

export const StructurePage = createSlice({
    name: 'StructurePage',
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
export const { actions: StructurePageActions } = StructurePage;
export const { reducer: StructurePageReducer } = StructurePage;
