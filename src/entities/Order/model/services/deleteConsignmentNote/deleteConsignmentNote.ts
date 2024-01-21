import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AxiosResponse } from 'axios';
import { Order } from '../../..';
import {
    fetchMaterialDataForOrder
} from '../fetchMaterialDataForOrder/fetchMaterialDataForOrder';

interface responseInterface  {
    status: string
    order: Order
}

interface paramsInterface {
    orderId: string
    consignmentNoteId: string
}

export const deleteConsignmentNote = createAsyncThunk<void, paramsInterface, ThunkConfig<string> >(
    'orderDetails/deleteConsignmentNote',
    async ({ orderId, consignmentNoteId }, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            const response = await extra.api.delete<responseInterface, AxiosResponse, Order>(`/order/${orderId}/deleteConsignment/${consignmentNoteId}`,
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