import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../../model/types/orderDetailsSliceSchema';
import { AxiosResponse } from 'axios';
import { filterObject } from '@/shared/lib/filterObject/filterObject';

interface responseInterface  {
    status: string
    order: Order
}

export const updateOrderById = createAsyncThunk<Order, string, ThunkConfig<string> >(
    'orderDetails/updateMaterialById',
    async (orderId, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        const orderForm = filterObject<Order>(getState()!.orderDetails!.form, ['__v', '_id', 'modified']);

        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            const response = await extra.api.put<responseInterface, AxiosResponse, Order>(`/order/${orderId}`,
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
            return response.data.order;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }

    }
);