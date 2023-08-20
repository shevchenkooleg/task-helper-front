import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderDetailsSliceSchema } from '../types/orderDetailsSliceSchema';
import { fetchOrderById } from '../services/fetchOrderById/fetchOrderById';
import { updateOrderById } from '../../model/services/updateOrderById/updateOrderById';
import { deleteOrderById } from '../../model/services/deleteOrderById/deleteOrderById';

const initialState: OrderDetailsSliceSchema = {
    error: '',
    isLoading: false,
    editMode: false,
    order: {},
    form: {}
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetailsSlice',
    initialState,
    reducers: {
        setEditMode: (state, action: PayloadAction<boolean>)=>{
            state.editMode = action.payload;
        },
        updateOrderForm: (state, action: PayloadAction<Order>) => {
            state.form = {
                ...state.form,
                ...action.payload
            };
        },
        rollBackForm: (state)=>{
            state.form = { ...state.order };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchOrderById.fulfilled, (state,action) => {
                state.isLoading = false;
                console.log('action.payload ', action.payload);
                state.order = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(updateOrderById.fulfilled, (state,action) => {
                state.order = action.payload;
                state.form = action.payload;
                state.isLoading = false;
                state.editMode = false;
            })
            .addCase(updateOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteOrderById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(deleteOrderById.fulfilled, (state) => {
                state.isLoading = false;
                state.editMode = false;
            })
            .addCase(deleteOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: orderDetailsSliceActions } = orderDetailsSlice;
export const { reducer: orderDetailsSliceReducer } = orderDetailsSlice;
