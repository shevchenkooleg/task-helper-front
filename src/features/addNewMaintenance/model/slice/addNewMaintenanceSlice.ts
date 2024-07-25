import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewMaintenanceSliceSchema } from '../types/addNewMaintenance';
import {
    fetchMaintenanceForComboBox
} from '../services/fetchMaintenanceForComboBox/fetchMaintenanceForComboBox';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';

const initialState: AddNewMaintenanceSliceSchema = {
    isLoading: false,
    error: '',
    newMaintenance: {},
    // replaceableMaintenance: [],
    // possibleReplaceableItems: []
};

export const addNewMaintenanceSlice = createSlice({
    name: 'addNewMaintenanceSlice',
    initialState,
    reducers: {
        setNewMaintenanceFullName: (state: AddNewMaintenanceSliceSchema, action: PayloadAction<string>) => {
            state.newMaintenance.fullName = action.payload;
        },
        setNewMaintenanceShortName: (state: AddNewMaintenanceSliceSchema, action: PayloadAction<string>) => {
            state.newMaintenance.shortName = action.payload;
        },
        // setNewMaintenancePeriodicity: (state: AddNewMaintenanceSliceSchema, action: PayloadAction<MaintenancePeriodicity>) => {
        //     state.newMaintenance.periodicity = action.payload;
        // },
        // setReplaceableMaintenanceItem: (state: AddNewMaintenanceSliceSchema, action: PayloadAction<AdminPanelMaintenanceItem>)=>{
        //     state.replaceableMaintenance.push(action.payload);
        //     action.payload._id && state.newMaintenance.replaceableMaintenanceId?.push(action.payload._id);
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaintenanceForComboBox.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchMaintenanceForComboBox.fulfilled, (state, action: PayloadAction<AdminPanelMaintenanceItem[]>) => {
                state.isLoading = false;
                // state.possibleReplaceableItems = action.payload;

            })
            .addCase(fetchMaintenanceForComboBox.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? 'error';
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: addNewMaintenanceActions } = addNewMaintenanceSlice;
export const { reducer: addNewMaintenanceReducer } = addNewMaintenanceSlice;
