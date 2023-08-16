import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface responseInterface  {
    status: string
}

export const deleteMaterialById = createAsyncThunk<responseInterface, string, ThunkConfig<string> >(
    'orderDetails/deleteMaterialById',
    async (orderId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            const response = await extra.api.delete<responseInterface>(`/material/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
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