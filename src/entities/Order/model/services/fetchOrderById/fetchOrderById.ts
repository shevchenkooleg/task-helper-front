import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../..';

interface responseInterface  {
    status: string
    order: Order
}

export const fetchOrderById = createAsyncThunk<Order, string, ThunkConfig<string> >(
    'orderDetails/fetchOrderById',
    async (orderId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            const response = await extra.api.get<responseInterface>(`/order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!response.data) {
                throw new Error();
            }
            return response.data.order;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);