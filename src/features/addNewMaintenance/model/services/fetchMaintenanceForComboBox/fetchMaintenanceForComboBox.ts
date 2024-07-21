import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';


export const fetchMaintenanceForComboBox = createAsyncThunk<AdminPanelMaintenanceItem[], string, ThunkConfig<string>>(
    'maintenance/fetchMaintenanceForComboBox',
    async (query, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        if (!query){
            return [];
        }

        try {
            const maintenanceList = await extra.api.get<[AdminPanelMaintenanceItem]>('/maintenance/search', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    searchQuery: query
                }
            }
            );
            if (!maintenanceList.data) {
                throw new Error();
            }
            console.log(maintenanceList);
            return maintenanceList.data;
        } catch (e: any) {
            console.log(e);
            if (e.response.data === 'Unauthorized'){
                dispatch(userActions.logout());
                return rejectWithValue('Unauthorized');
            }
            return rejectWithValue('error');
        }
    }
);