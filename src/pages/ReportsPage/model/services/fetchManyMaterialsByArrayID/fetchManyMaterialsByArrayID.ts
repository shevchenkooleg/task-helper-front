import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Material } from '@/entities/Material';
import { MaterialToReportTab } from '@/entities/Material';

export const fetchManyMaterialsByArrayID = createAsyncThunk<MaterialToReportTab[], string[], ThunkConfig<string> >(
    'reportsPage/fetchManyMaterialsByArrayID',
    async (materialId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!materialId) {
                throw new Error('Material not defined');
            }
            const response = await extra.api.get<Material[]>('/material/searchMany/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: materialId
            });
            if (!response.data) {
                throw new Error();
            }
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);