import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrder } from '@/shared/types/sort';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersPageIsInit } from '../selectors/getOrdersPageIsInit/getOrdersPageIsInit';
import { OrdersSortField } from '@/shared/const/orderConsts';
import { orderListFiltersSliceActions } from '@/features/orderListFilters';
import { ordersPageSliceActions } from '../slice/ordersPageSlice';



export const initOrdersPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string> >(
    'orders/initOrdersPage',
    async (searchParams, thunkAPI) => {
        const { getState, dispatch } = thunkAPI;

        const isInit = getOrdersPageIsInit(getState());
        if (!isInit) {
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as OrdersSortField;


            if (orderFromUrl) {
                dispatch(orderListFiltersSliceActions.setSortOrder(orderFromUrl));
            }
            if (sortFromUrl) {
                dispatch(orderListFiltersSliceActions.setSortField(sortFromUrl));
            }

            dispatch(ordersPageSliceActions.setIsInit());
            console.log('request order because getOrdersPage is init');
            // dispatch(getOrdersList(null));
        }
    }
);