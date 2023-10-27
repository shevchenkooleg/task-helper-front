import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderListFiltersSchema } from '../types/orderListFiltersType';
import { OrdersSortField, OrderStatus } from '@/shared/const/orderConsts';
import { SortOrder } from '@/shared/types/sort';
import { ORDERS_STATUS_FILTER_VALUE, YEAR_OF_EXECUTION_SELECTOR_VALUE } from '@/shared/const/localStorage';

const localStorageOrdersStatusFilterValue = localStorage.getItem(ORDERS_STATUS_FILTER_VALUE) ?? 'null';

const ordersStatusFilterValue = JSON.parse( localStorageOrdersStatusFilterValue ) ?? {
    [OrderStatus.NONE]: true,
    [OrderStatus.AGREEMENT]: true,
    [OrderStatus.ISSUED]: true,
    [OrderStatus.EXECUTING]: true,
    [OrderStatus.TECHNICAL_CLOSED]: true,
    [OrderStatus.WAITING_FOR_TECHNICAL_CLOSING]: true,
    [OrderStatus.WAITING_FOR_REQUEST]: true
};

const initialState: OrderListFiltersSchema = {
    error: '',
    isLoading: false,
    order: 'asc',
    sortField: OrdersSortField.ORDER_ID,
    search: '',
    yearOfExecution: localStorage.getItem(YEAR_OF_EXECUTION_SELECTOR_VALUE) ?? 'any',
    orderStatusBox: ordersStatusFilterValue,
    orderStatusBoxForm: ordersStatusFilterValue
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
        },
        setYearOfExecutionsFilter: (state, action: PayloadAction<string>) => {
            state.yearOfExecution = action.payload;
            localStorage.setItem(YEAR_OF_EXECUTION_SELECTOR_VALUE, action.payload);
        },
        toggleOrderStatusBoxElement: (state, action: PayloadAction<{field: string, status: boolean}>) => {
            state.orderStatusBoxForm[action.payload.field] = action.payload.status;
        },
        setOrderStatusBoxElements: (state, action:PayloadAction<boolean>) => {
            for (const key in state.orderStatusBox) {
                state.orderStatusBoxForm[key] = action.payload;
            }
        },
        resetOrderStatusBoxForm: (state) => {
            state.orderStatusBoxForm = { ...state.orderStatusBox };
        },
        setOrderStatusBoxForm: (state) => {
            state.orderStatusBox = { ...state.orderStatusBoxForm };
            localStorage.setItem(ORDERS_STATUS_FILTER_VALUE, JSON.stringify(state.orderStatusBoxForm));
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
