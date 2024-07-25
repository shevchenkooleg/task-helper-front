import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Maintenance, Unit, UnitDetailsSliceSchema } from '../types/unitDetailsTypes';
import { UnitType } from '@/shared/const/unitConsts';
import { updateUnitById } from '../../model/services/updateUnitById';

const initialState: UnitDetailsSliceSchema = {
    error:'',
    unit: {} as Unit,
    form: {} as Unit,
    isLoading: false,
};

export const UnitDetailsSlice = createSlice({
    name: 'UnitDetailsSlice',
    initialState,
    reducers: {
        setUnitDetailsData: (state, action:PayloadAction<Unit>)=>{
            state.unit = action.payload;
            state.form = action.payload;
        },
        setScheduledMaintenanceListItem: (state, action: PayloadAction<Maintenance>)=>{
            switch (state.form.unitType){
            case (UnitType.EQUIPMENT):
                state.form.scheduledMaintenanceList = [...state.form.scheduledMaintenanceList!, action.payload];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUnitById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(updateUnitById.fulfilled, (state, action: PayloadAction<Unit>) => {
                state.isLoading = false;
                console.log('UnitDetailsSlice ', action.payload);
                state.unit = action.payload;
                state.form = action.payload;
            })
            .addCase(updateUnitById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'request error';
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: UnitDetailsSliceActions } = UnitDetailsSlice;
export const { reducer: UnitDetailsSliceReducer } = UnitDetailsSlice;
