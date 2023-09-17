import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderListFiltersSchema } from '../types/orderListFiltersType';
import { OrdersSortField } from '@/shared/const/orderConsts';
import { SortOrder } from '@/shared/types/sort';

const initialState: OrderListFiltersSchema = {
    error: '',
    isLoading: false,
    order: 'asc',
    sortField: OrdersSortField.ORDER_ID,
    search: ''
};

export const orderListFiltersSlice = createSlice({
    name: 'orderListFiltersSlice',
    initialState,
    reducers: {
        setSortField: (state, action: PayloadAction<OrdersSortField>) => {
            state.sortField = action.payload;
        },
        setSortOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        }
    },
    extraReducers: (builder) => {
        //builder
        //.addCase(loginByUsername.pending, (state) => {
        //    state.error = undefined
        //    state.isLoading = true
        //})
        //.addCase(loginByUsername.fulfilled, (state) => {
        //    state.isLoading = false
        //})
        //.addCase(loginByUsername.rejected, (state, action) => {
        //    state.isLoading = false
        //    state.error = action.payload
        //})
    }
});

// Action creators are generated for each case reducer function
export const { actions: orderListFiltersSliceActions } = orderListFiltersSlice;
export const { reducer: orderListFiltersSliceReducer } = orderListFiltersSlice;
