import { createSlice } from '@reduxjs/toolkit';
import { OrdersPageSchema } from '../types/ordersPage';
import { getOrdersList } from '@/features/getOrdersList';

const initialState: OrdersPageSchema = {
    error: '',
    isLoading: false,
    orders: []
};

export const ordersPageSlice = createSlice({
    name: 'ordersPageSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersList.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getOrdersList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrdersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: ordersPageSliceActions } = ordersPageSlice;
export const { reducer: ordersPageSliceReducer } = ordersPageSlice;
