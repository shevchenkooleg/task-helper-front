import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';

interface AddNewMaintenanceProps {
    fullName: string,
    shortName: string,
    periodicity: string,
    replaceableMaintenance: string[]
}

export const addNewMaintenance = createAsyncThunk<AdminPanelMaintenanceItem, AddNewMaintenanceProps, ThunkConfig<string>>(
    'maintenance/addNewMaintenance',
    async (newMaintenanceData, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        try {

            const newMaintenance = await extra.api.post<AdminPanelMaintenanceItem>('/maintenance/', {
                ...newMaintenanceData
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
            );
            if (!newMaintenance.data) {
                throw new Error();
            }
            return newMaintenance.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        } finally {
            dispatch(userActions.setIsInit());
        }
    }
);