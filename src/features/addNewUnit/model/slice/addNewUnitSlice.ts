import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewUnitSliceSchema } from '../types/addNewUnit';
import { UnitType } from '@/shared/const/unitConsts';
import { addNewUnit } from '../services/addNewUnit/addNewUnit';
import { fetchParentForNewUnit } from '../..';
import { Unit } from '@/entities/Unit';

const initialState: AddNewUnitSliceSchema = {
    error: '',
    isLoading: false,
    validationError: false,
    possibleParentUnits: [],
    parentUnit: { },
    newUnit: {
        unitName: '',
        unitType: UnitType.TECHNICAL_PLACE,
        parentId: ''
    }
};

export const AddNewUnitSlice = createSlice({
    name: 'addNewUnitSlice',
    initialState,
    reducers: {
        setUnitType: (state, action: PayloadAction<UnitType>) =>{
            console.log(action.payload);
            state.newUnit.unitType = action.payload;
        },
        setUnitName: (state, action: PayloadAction<string>) => {
            state.newUnit.unitName = action.payload;
        },
        setValidationError: (state, action: PayloadAction<boolean>) => {
            state.validationError = action.payload;
        },
        setParentUnit: (state, action: PayloadAction<Unit>) => {
            state.parentUnit = action.payload;
            state.newUnit.parentId = action.payload._id;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewUnit.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(addNewUnit.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNewUnit.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? '500';
            })
            .addCase(fetchParentForNewUnit.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchParentForNewUnit.fulfilled, (state, action:PayloadAction<Unit[]>) => {
                state.isLoading = false;
                state.possibleParentUnits = action.payload;
            })
            .addCase(fetchParentForNewUnit.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'query error';
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: AddNewUnitSliceActions } = AddNewUnitSlice;
export const { reducer: AddNewUnitSliceReducer } = AddNewUnitSlice;
