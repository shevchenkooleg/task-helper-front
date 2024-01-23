import { Order } from '../../..';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AxiosResponse } from 'axios';
import {
    fetchMaterialDataForOrder
} from '../fetchMaterialDataForOrder/fetchMaterialDataForOrder';

interface responseInterface  {
    status: string
    order: Order
}

interface paramsInterface {
    orderId: string
    executionId: string
}

export const deleteExecution = createAsyncThunk<void, paramsInterface, ThunkConfig<string> >(
    'orderDetails/deleteExecution',
    async ({ orderId, executionId }, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            const response = await extra.api.delete<responseInterface, AxiosResponse, Order>(`/order/${orderId}/deleteExecution/${executionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            if (!response.data) {
                throw new Error();
            }
            console.log(response.data.order);
            thunkAPI.dispatch(fetchMaterialDataForOrder(response.data.order));
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }

    }
);