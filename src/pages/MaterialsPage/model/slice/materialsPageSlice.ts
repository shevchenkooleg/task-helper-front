import { createSlice } from '@reduxjs/toolkit';
import { MaterialsPageSchema } from '../types/materialsPageSchema';
import { getMaterialsList } from '@/features/getMaterialsList';

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
        builder
            .addCase(getMaterialsList.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getMaterialsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.materials = action.payload;
            })
            .addCase(getMaterialsList.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload){
                    state.error = action.payload;
                }
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: materialsPageSliceActions } = materialsPageSlice;
export const { reducer: materialsPageSliceReducer } = materialsPageSlice;
