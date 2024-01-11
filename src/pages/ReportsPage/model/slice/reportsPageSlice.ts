import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportsPageSchema } from '../types/reportsPage';
import { MaterialToReportTab } from '@/entities/Material';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';

const initialState: ReportsPageSchema = {
    error: '',
    totalVolumeMaterialReport: [],
    _isInit: false,
    isLoading: false,
    reportPageSettings: { reportYear: '2024', orderType: OrderType.INDEPENDENT, orderExecutionType: OrderExecutionType.PLANNED }
};

export const reportsPageSlice = createSlice({
    name: 'reportsPageSlice',
    initialState,
    reducers: {
        setTotalVolumeMaterialReport: (state, action: PayloadAction<MaterialToReportTab[]>) => {
            state.totalVolumeMaterialReport = action.payload;
        },
        setReportYear: (state, action: PayloadAction<string>) => {
            state.reportPageSettings.reportYear = action.payload;
        },
        setOrderType: (state, action: PayloadAction<OrderType>) => {
            state.reportPageSettings.orderType = action.payload;
        },
        setOrderExecutionType: (state, action: PayloadAction<OrderExecutionType>) => {
            state.reportPageSettings.orderExecutionType = action.payload;
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
export const { actions: reportsPageSliceActions } = reportsPageSlice;
export const { reducer: reportsPageSliceReducer } = reportsPageSlice;
