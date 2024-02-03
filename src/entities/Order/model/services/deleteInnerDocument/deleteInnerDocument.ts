import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AxiosResponse } from 'axios';
import { Order } from '../../..';
import {
    fetchMaterialDataForOrder
} from '../fetchMaterialDataForOrder/fetchMaterialDataForOrder';
import {
    DeleteInnerDocumentOperationsTypes
} from '../../types/orderDetailsSliceSchema';

interface responseInterface  {
    status: string
    order: Order
}

interface DeleteInnerDocumentParams {
    orderId: string
    operationType: DeleteInnerDocumentOperationsTypes
    documentId: string
}

export const deleteInnerDocument = createAsyncThunk<void, DeleteInnerDocumentParams, ThunkConfig<string> >(
    'orderDetails/deleteInnerDocument',
    async ({ orderId, operationType, documentId }, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            if (!operationType) {
                throw new Error('Operation type not defined');
            }
            if (!documentId) {
                throw new Error('Inner document not defined');
            }
            const response = await extra.api.delete<responseInterface, AxiosResponse, Order>(`/order/${orderId}/deleteInnerDocument/${operationType}/${documentId}`,
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