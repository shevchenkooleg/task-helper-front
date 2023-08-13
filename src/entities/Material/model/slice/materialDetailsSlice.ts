import { createSlice } from '@reduxjs/toolkit';
import { Material, MaterialDetailsSliceSchema } from '../types/materialDetailsSliceSchema';

const initialState: MaterialDetailsSliceSchema = {
    isLoading: false,
    error: '',
    newMaterial: {} as Material
};

export const materialDetailsSlice = createSlice({
    name: 'newMaterialSlice',
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
export const { actions: newMaterialSliceActions } = materialDetailsSlice;
export const { reducer: newMaterialSliceReducer } = materialDetailsSlice;
