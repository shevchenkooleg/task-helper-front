import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../../model/types/orderDetailsSliceSchema';
import { AxiosResponse } from 'axios';
import { filterObject } from '@/shared/lib/filterObject/filterObject';
import {
    fetchMaterialDataForOrder
} from '../fetchMaterialDataForOrder/fetchMaterialDataForOrder';

interface responseInterface  {
    status: string
    order: Order
}

export const updateOrderById = createAsyncThunk<void, string, ThunkConfig<string> >(
    'orderDetails/updateOrderById',
    async (orderId, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        const orderForm = filterObject<Order>(getState()!.orderDetails!.form, ['__v', '_id', 'modified']);
        const materialsForUpdate = orderForm.materials?.map(el=>filterObject(el, ['KSUId', 'dimension', 'fullVolume', 'materialName', '__v',]));
        console.log('materialsForUpdate ', materialsForUpdate);
        console.log('orderForm ', orderForm);

        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            const response = await extra.api.put<responseInterface, AxiosResponse, Order>(`/order/${orderId}`,
                {
                    ...orderForm, materials: [...materialsForUpdate!]
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
            console.log(response.data.order);
            thunkAPI.dispatch(fetchMaterialDataForOrder(response.data.order));
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }

    }
);