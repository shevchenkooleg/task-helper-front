import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../types/orderDetailsSliceSchema';
import { Material } from '@/entities/Material';
import {
    fetchMaterialDataForOrder
} from '../fetchMaterialDataForOrder/fetchMaterialDataForOrder';

interface responseOrderInterface  {
    status: string
    order: Order
}

type responseMaterialInterface = [Material]


export const fetchOrderById = createAsyncThunk<void, string, ThunkConfig<string> >(
    'orderDetails/fetchOrderById',
    async (orderId, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            const orderData = await extra.api.get<responseOrderInterface>(`/order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!orderData.data) {
                throw new Error();
            }
            thunkAPI.dispatch(fetchMaterialDataForOrder(orderData.data.order));

        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);