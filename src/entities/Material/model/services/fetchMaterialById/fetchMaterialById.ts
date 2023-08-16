import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Material } from '../../../model/types/materialDetailsSliceSchema';

interface responseInterface  {
    status: string
    material: Material
}

export const fetchMaterialById = createAsyncThunk<Material, string, ThunkConfig<string> >(
    'materialDetails/fetchMaterialById',
    async (materialId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!materialId) {
                throw new Error('Material not defined');
            }
            const response = await extra.api.get<responseInterface>(`/material/${materialId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!response.data) {
                throw new Error();
            }
            return response.data.material;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);