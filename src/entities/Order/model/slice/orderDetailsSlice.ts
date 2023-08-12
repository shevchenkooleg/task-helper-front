import { createSlice } from '@reduxjs/toolkit';
import { OrderDetailsSliceSchema } from '../types/orderDetailsSliceSchema';
import { fetchOrderById } from '../services/fetchOrderById/fetchOrderById';

const initialState: OrderDetailsSliceSchema = {
    error: '',
    isLoading: false,
    editMode: false,
    order: {}
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetailsSlice',
    initialState,
    reducers: {
        toggleEdit: (state)=>{
            state.editMode = !state.editMode;
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
                state.order = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: orderDetailsSliceActions } = orderDetailsSlice;
export const { reducer: orderDetailsSliceReducer } = orderDetailsSlice;
