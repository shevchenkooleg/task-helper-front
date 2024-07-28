import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddMaintenanceToUnitSliceSchema } from '../types/addMaintenanceToUnit';
import { MaintenancePeriodicity } from '@/shared/const/maintenanceConsts';
import {
    fetchMaintenanceForUnitAdd
} from '../services/fetchMaintenanceForUnitAdd/fetchMaintenanceForUnitAdd';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';

const initialState: AddMaintenanceToUnitSliceSchema = {
    isLoading: false,
    error: '',
    newMaintenance: {
        replaceableMaintenanceId: []
    },
    possibleMaintenanceToAdd: []
};

export const AddMaintenanceToUnitSlice = createSlice({
    name: 'AddMaintenanceToUnitSlice',
    initialState,
    reducers: {
        setNewMaintenancePeriodicity: (state, action: PayloadAction<MaintenancePeriodicity>)=>{
            state.newMaintenance.periodicity = action.payload;
        },
        setSelectedMaintenanceBasicData: (state, action: PayloadAction<AdminPanelMaintenanceItem>) => {
            state.newMaintenance._id = action.payload._id;
            state.newMaintenance.fullName = action.payload.fullName;
            state.newMaintenance.shortName = action.payload.shortName;
        },
        addReplaceableMaintenanceId: (state, action: PayloadAction<string>) =>{
            if (state.newMaintenance.replaceableMaintenanceId) state.newMaintenance.replaceableMaintenanceId.push(action.payload);
        },
        deleteReplaceableMaintenanceId: (state, action: PayloadAction<string>) =>{
            state.newMaintenance.replaceableMaintenanceId = state.newMaintenance!.replaceableMaintenanceId!.filter(el=> el !== action.payload);
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaintenanceForUnitAdd.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchMaintenanceForUnitAdd.fulfilled, (state, action: PayloadAction<AdminPanelMaintenanceItem[]>) => {
                state.isLoading = false;
                state.possibleMaintenanceToAdd = action.payload;
            })
            .addCase(fetchMaintenanceForUnitAdd.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: AddMaintenanceToUnitActions } = AddMaintenanceToUnitSlice;
export const { reducer: AddMaintenanceToUnitReducer } = AddMaintenanceToUnitSlice;
