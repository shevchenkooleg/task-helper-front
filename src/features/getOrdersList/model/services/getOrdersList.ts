import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Order } from '@/entities/Order';


export const getOrdersList = createAsyncThunk<Order[], null, ThunkConfig<string>>(
    'orders/getOrdersList',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            const ordersList = await extra.api.get<Order[]>('/order/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!ordersList.data) {
                throw new Error();
            }
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