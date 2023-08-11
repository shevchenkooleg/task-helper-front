import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Order } from '@/entities/Order';

interface AddNewOrderProps {
    orderId: string
    description: string
    userId: string
}

export const addNewOrder = createAsyncThunk<Order, AddNewOrderProps, ThunkConfig<string>>(
    'order/addNewOrder',
    async (newOrderData, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        try {

            const newOrder = await extra.api.post<Order>('/order/', {
                ...newOrderData
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
            );
            if (!newOrder.data) {
                throw new Error();
            }
            console.log(newOrder);
            return newOrder.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        } finally {
            dispatch(userActions.setIsInit());
        }
    }
);