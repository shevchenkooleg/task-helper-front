import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Order } from '@/entities/Order';
//TODO fix fsd layers

// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { getOrderListFilterField, getOrderListFiltersSortOrder } from '@/features/orderListFilters';
import { OrderSortQueryMapper, OrdersSortField } from '@/shared/const/orderConsts';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';


export const getOrdersList = createAsyncThunk<Order[], null, ThunkConfig<string>>(
    'orders/getOrdersList',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        const order = getOrderListFiltersSortOrder(getState()) ?? 'asc';
        const sort = getOrderListFilterField(getState()) ?? OrdersSortField.ORDER_ID;
        console.log(sort);
        console.log(order);


        try {
            addQueryParams({
                sort: OrderSortQueryMapper[sort], order
            });
            const ordersList = await extra.api.get<Order[]>('/order/', {
                params: {
                    sort: OrderSortQueryMapper[sort],
                    order: order
                },
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

function getOrderListFiltersField() {
    throw new Error('Function not implemented.');
}
