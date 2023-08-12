import { createSlice } from '@reduxjs/toolkit';
import { AddNewOrderSliceSchema } from '../types/addNewOrder';

const initialState: AddNewOrderSliceSchema = {
    error: '',
    isLoading: false,
    newOrder: {}
};

export const addNewOrderSlice = createSlice({
    name: 'addNewOrderSlice',
    initialState,
    reducers: {
        setNewOrderId: (state, action) => {
            state.newOrder.orderId = action.payload;
        },
        setNewOrderDescription: (state, action) => {
            state.newOrder.description = action.payload;
        },
        setNewOrderYearOfExecution: (state, action) => {
            state.newOrder.yearOfExecution = action.payload;
        },
        resetForm: (state)=>{
            state.newOrder.orderId = '';
            state.newOrder.description = '';
            state.newOrder.yearOfExecution = '';
            state.error = '';
            state.isLoading = false;
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
export const { actions: addNewOrderActions } = addNewOrderSlice;
export const { reducer: addNewOrderReducer } = addNewOrderSlice;
