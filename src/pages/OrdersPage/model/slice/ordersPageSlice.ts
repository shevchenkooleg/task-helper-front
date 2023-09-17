import { createSlice } from '@reduxjs/toolkit';
import { OrdersPageSchema } from '../types/ordersPage';
import { getOrdersList } from '@/features/getOrdersList';

const initialState: OrdersPageSchema = {
    error: '',
    isLoading: false,
    orders: [],
    _isInit: false
};

export const ordersPageSlice = createSlice({
    name: 'ordersPageSlice',
    initialState,
    reducers: {
        setIsInit: (state)=>{
            state._isInit = true;
        }
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
