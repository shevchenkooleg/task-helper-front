import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Order } from '@/entities/Order';
//TODO fix fsd layers

// eslint-disable-next-line path-import-validation-plugin/layer-imports
import {
    getOrderListFilterField,
    getOrderListFiltersSortOrder,
    getOrderListFiltersYearOfExecution, getOrderStatusBoxValues
} from '@/features/orderListFilters';
import { defaultOrdersStatusFilterValue, OrderSortQueryMapper, OrdersSortField } from '@/shared/const/orderConsts';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { addQueryFilterStatus } from '@/shared/lib/addQueryFilterStatus/addQueryFilterStatus';


export const getOrdersList = createAsyncThunk<Order[], null, ThunkConfig<string>>(
    'orders/getOrdersList',
    async (_, thunkAPI) => {
        const { dispatch, rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        const order = getOrderListFiltersSortOrder(getState()) ?? 'asc';
        const sort = getOrderListFilterField(getState()) ?? OrdersSortField.ORDER_ID;
        const yearOfExecution = getOrderListFiltersYearOfExecution(getState()) ?? 'any';
        const orderStatusFilterFields  = getOrderStatusBoxValues(getState()) ?? defaultOrdersStatusFilterValue;


        const queryParams = addQueryFilterStatus(
            {
                sort: OrderSortQueryMapper[sort],
                order,
                yearOfExecution
            },
            orderStatusFilterFields
        );


        console.log(queryParams);

        try {
            console.log('request orders thunk body execute');
            addQueryParams(queryParams);
            const ordersList = await extra.api.get<Order[]>('/order/', {
                params: queryParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!ordersList.data) {
                throw new Error();
            }
            console.log(ordersList.data);
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
