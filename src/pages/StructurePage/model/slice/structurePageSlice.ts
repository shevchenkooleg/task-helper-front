import { createSlice } from '@reduxjs/toolkit';
import { StructurePageSchema } from '../types/structurePage';
import { getUnitList } from '@/features/getMainParentUnits';

const initialState: StructurePageSchema = {
    error: '',
    isLoading: false,
    units: {},
};

export const StructurePage = createSlice({
    name: 'StructurePage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUnitList.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getUnitList.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.length > 0) state.units[action.payload[0].parentId as string] = action.payload;
                // state.units = { [action.payload[0].parentId as string]: action.payload };
            })
            .addCase(getUnitList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'request error';
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: StructurePageActions } = StructurePage;
export const { reducer: StructurePageReducer } = StructurePage;
