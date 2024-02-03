import { Order } from '../../..';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AxiosResponse } from 'axios';
import {
    fetchMaterialDataForOrder
} from '../fetchMaterialDataForOrder/fetchMaterialDataForOrder';
import { CreateInnerDocumentOperationsTypes } from '../../types/orderDetailsSliceSchema';

interface ResponseInterface  {
    status: string
    order: Order
}
interface CreateInnerDocumentParams {
    orderId: string
    operationType: CreateInnerDocumentOperationsTypes
    correctionId?: string
}

export const createInnerDocument = createAsyncThunk<void, CreateInnerDocumentParams, ThunkConfig<string> >(
    'orderDetails/createInnerDocument',
    async ({ orderId, operationType , correctionId }, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!orderId) {
                throw new Error('Order not defined');
            }
            if (!operationType) {
                throw new Error('Operation type not defined');
            }
            const response = await extra.api.post<ResponseInterface, AxiosResponse, {additionalData: string }>(`/order/${orderId}/createInnerDocument/${operationType}`,
                { additionalData: correctionId ?? 'testData' },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                },
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