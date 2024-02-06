import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Order } from '@/entities/Order';

export interface FetchOrdersWithExecMaterialIdParams {
    materialId: string
    yearOfExecution: string
    userId: string
}

export const fetchOrdersWithExecMaterialId = createAsyncThunk<Order[], FetchOrdersWithExecMaterialIdParams, ThunkConfig<string> >(
    'reportsPage/fetchManyMaterialsByArrayID',
    async (queryParams, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!queryParams) {
                throw new Error('Material not defined');
            }
            const response = await extra.api.get<Order[]>('/order/searchWithMaterial', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: queryParams
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