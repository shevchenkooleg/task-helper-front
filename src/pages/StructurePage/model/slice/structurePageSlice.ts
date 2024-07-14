import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StructurePageSchema } from '../types/structurePage';
import { getUnitList } from '@/features/getMainParentUnits';
import { structureTreeShaker } from '@/shared/lib/structureTreeShaker/structureTreeShaker';

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
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: StructurePageActions } = StructurePage;
export const { reducer: StructurePageReducer } = StructurePage;
