import { createSlice } from '@reduxjs/toolkit';
import { MaterialsPageSchema } from '../types/materialsPageSchema';

const initialState: MaterialsPageSchema = {
    error: '',
    isLoading: false,
    materials: []
};

export const materialsPageSlice = createSlice({
    name: 'materialsPageSlice',
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
export const { actions: materialsPageSliceActions } = materialsPageSlice;
export const { reducer: materialsPageSliceReducer } = materialsPageSlice;
