import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderDetailsSliceSchema } from '../types/orderDetailsSliceSchema';
import { fetchOrderById } from '../services/fetchOrderById/fetchOrderById';
import { updateOrderById } from '../../model/services/updateOrderById/updateOrderById';
import { deleteOrderById } from '../../model/services/deleteOrderById/deleteOrderById';
import { MaterialToOrderTab } from '@/entities/Material';
import { expandDataForMaterial } from '../../model/services/expandDataForMaterial/expandDataForMaterial';
import {
    fetchMaterialDataForOrder
} from '../services/fetchMaterialDataForOrder/fetchMaterialDataForOrder';

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
        },
        addMaterialToOrder: (state, action: PayloadAction<MaterialToOrderTab>) => {
            state.form!.materials!.push(action.payload);
        },
        updateMaterialDataInOrder: (state, action:PayloadAction<MaterialToOrderTab>) => {
            state.form!.materials!.map((el,index) => {
                el._id === action.payload._id ? state.form!.materials![index] = action.payload : null;
            });
        },
        deleteMaterialInOrder: (state, action:PayloadAction<string>) => {
            state.form!.materials! = [...state.form!.materials!.filter(el=>el._id !== action.payload)];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            // .addCase(fetchOrderById.fulfilled, (state,action) => {
            //     state.isLoading = false;
            // })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchMaterialDataForOrder.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchMaterialDataForOrder.fulfilled, (state,action) => {
                state.isLoading = false;
                state.order = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchMaterialDataForOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(updateOrderById.fulfilled, (state,action) => {
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
            })
            .addCase(expandDataForMaterial.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(expandDataForMaterial.fulfilled, (state, action) => {
                state.isLoading = false;
                state.form!.materials!.push(action.payload);
            })
            .addCase(expandDataForMaterial.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    }
});

// Action creators are generated for each case reducer function
export const { actions: orderDetailsSliceActions } = orderDetailsSlice;
export const { reducer: orderDetailsSliceReducer } = orderDetailsSlice;
