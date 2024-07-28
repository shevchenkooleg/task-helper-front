import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Maintenance, Unit, UnitDetailsSliceSchema } from '../types/unitDetailsTypes';
import { UnitType } from '@/shared/const/unitConsts';
import { updateUnitById } from '../../model/services/updateUnitById';
import { getMaintenanceForAdminPanel } from '@/features/getAdminPanelData';

const initialState: UnitDetailsSliceSchema = {
    error:'',
    unit: {} as Unit,
    form: {} as Unit,
    isLoading: false,
    maintenanceDictionary: []
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
        },
        setUnitNameFormData: (state, action:PayloadAction<string>)=>{
            state.form.unitName = action.payload;
        },
        setUnitKKSFormData: (state, action:PayloadAction<string>)=>{
            state.form.unitKKS = action.payload;
        },
        setToroKKSFormData: (state, action:PayloadAction<string>)=>{
            state.form.toroKKS = action.payload;
        },
        cancelUnitFormDataChanges: (state)=>{
            state.form = state.unit;
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
            })
            .addCase(getMaintenanceForAdminPanel.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getMaintenanceForAdminPanel.fulfilled, (state, action: PayloadAction<Maintenance[]>) => {
                state.isLoading = false;
                state.maintenanceDictionary = action.payload;
            })
            .addCase(getMaintenanceForAdminPanel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'request error';
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: UnitDetailsSliceActions } = UnitDetailsSlice;
export const { reducer: UnitDetailsSliceReducer } = UnitDetailsSlice;
