import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { GetOrdersListResponseInterface } from '../types/getOrdersListTypes';


export const getOrdersList = createAsyncThunk<GetOrdersListResponseInterface, null, ThunkConfig<string>>(
    'orders/getOrdersList',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            const ordersList = await extra.api.get<GetOrdersListResponseInterface>('/order/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!ordersList.data) {
                throw new Error();
            }
            console.log(ordersList);
            return ordersList.data;
        } catch (e: any) {
            console.log(e);
            if (e.response.data === 'Unauthorized'){
                dispatch(userActions.logout());
                return rejectWithValue('Unauthorized');
            }
            return rejectWithValue('error');
        }
    }
);