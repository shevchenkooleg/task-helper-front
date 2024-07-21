import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdminPanelUserData } from '../../types/adminPanelDataSchema';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';

export const getMaintenanceForAdminPanel = createAsyncThunk<AdminPanelMaintenanceItem[], null, ThunkConfig<string> >(
    'adminPanel/getMaintenanceForAdminPanel',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            const response = await extra.api.get<AdminPanelUserData[]>('/maintenance/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);