import { AdminPanelDataSchema, getMaintenanceForAdminPanel, getUsersForAdminPanel } from '@/features/getAdminPanelData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminPanelView } from '@/shared/const/adminPanelConsts';
import { filterObject } from '@/shared/lib/filterObject/filterObject';



const initialState: AdminPanelDataSchema = {
    users: {},
    maintenances: [],
    isLoading: false,
    error: '',
    view: AdminPanelView.USERS
};

export const adminPanelSlice = createSlice({
    name: 'adminPanelData',
    initialState,
    reducers: {
        setAdminPanelView: (state, action:PayloadAction<AdminPanelView>) => {
            state.view = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsersForAdminPanel.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getUsersForAdminPanel.fulfilled, (state, action) => {
                state.isLoading = false;
                action.payload.map(user=>{
                    state.users[user._id] = user;
                });
            })
            .addCase(getUsersForAdminPanel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getMaintenanceForAdminPanel.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getMaintenanceForAdminPanel.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                state.maintenances = action.payload.map(el=>filterObject(el,['__v']));
            })
            .addCase(getMaintenanceForAdminPanel.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: adminPanelDataActions } = adminPanelSlice;
export const { reducer: adminPanelDataReducer } = adminPanelSlice;
