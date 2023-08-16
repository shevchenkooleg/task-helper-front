import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { filterObject } from '@/shared/lib/filterObject/filterObject';
import { Material } from '../../types/materialDetailsSliceSchema';

interface responseInterface  {
    status: string
    material: Material
}

export const updateMaterialById = createAsyncThunk<Material, string, ThunkConfig<string> >(
    'materialDetails/updateMaterialById',
    async (materialId, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        const orderForm = filterObject<Material>(getState()!.materialDetails!.form, ['__v', '_id']);

        try {
            if (!materialId) {
                throw new Error('Material not defined');
            }
            const response = await extra.api.put<responseInterface, AxiosResponse, Material>(`/material/${materialId}`,
                {
                    ...orderForm
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
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