import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StructurePageSchema } from '../types/structurePage';
import { getUnitList } from '@/features/getMainParentUnits';
import { structureTreeShaker } from '@/shared/lib/structureTreeShaker/structureTreeShaker';
import { Unit, updateUnitById } from '@/entities/Unit';

const initialState: StructurePageSchema = {
    error: '',
    isLoading: false,
    units: {},
};

export const StructurePage = createSlice({
    name: 'StructurePage',
    initialState,
    reducers: {
        deleteStructureItems: (state, action: PayloadAction<string>)=>{
            const childArray = [] as string[];
            structureTreeShaker(state.units, action.payload, childArray);
            console.log('childArray ', childArray);
            childArray.forEach((el)=>{delete state.units[el];});
            delete state.units[action.payload];
        },
        updateStructureItems: (state, action: PayloadAction<Unit>)=>{
            console.log(action.payload);
            console.log('updateStructureItems');
            state.isLoading = false;
            const parentId = action.payload.parentId;

            parentId && state.units[parentId].map(el=> el._id === action.payload._id ? action.payload  : el);

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUnitList.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getUnitList.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
                if (action.payload.length > 0) state.units[action.payload[0].parentId as string] = action.payload;
                // state.units = { [action.payload[0].parentId as string]: action.payload };
            })
            .addCase(getUnitList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'request error';
            })
            .addCase(updateUnitById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(updateUnitById.fulfilled, (state, action: PayloadAction<Unit>) => {
                state.isLoading = false;
                const parentId = action.payload.parentId;
                if (parentId)
                {
                    const index = state.units[parentId].findIndex(el=>el._id === action.payload._id);
                    if (index >= 0) {
                        state.units[parentId][index] = action.payload;
                    }
                }
            })
            .addCase(updateUnitById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'request error';
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: StructurePageActions } = StructurePage;
export const { reducer: StructurePageReducer } = StructurePage;
