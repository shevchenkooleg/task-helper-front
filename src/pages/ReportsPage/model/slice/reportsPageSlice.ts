import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportsPageSchema, ReportsPageSetting } from '../types/reportsPage';
import { MaterialToReportTab } from '@/entities/Material';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';
import { Order } from '@/entities/Order';





const initialState: ReportsPageSchema = {
    error: '',
    totalVolumeMaterialReport: [],
    materialInvolvementReport: [],
    _isInit: false,
    isLoading: false,
    reportPageSettings: { } as ReportsPageSetting
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
        },
        setMaterialInvolvementReportData: (state, action:PayloadAction<Order[]>) => {
            state.materialInvolvementReport = [...action.payload];
        }
    },
    extraReducers: (builder) => {
        builder;
        //     .addCase(fetchOrdersWithExecMaterialId.pending, (state) => {
        //         state.error = undefined;
        //         state.isLoading = true;
        //     })
        //     .addCase(fetchOrdersWithExecMaterialId.fulfilled, (state, action) => {
        //         state.isLoading = false;
        //         state.ordersWithExecMaterialIdReport = action.payload;
        //     });
        //     .addCase(fetchOrdersWithExecMaterialId.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.error = action.payload;
        //     });
    }
});

// Action creators are generated for each case reducer function
export const { actions: reportsPageSliceActions } = reportsPageSlice;
export const { reducer: reportsPageSliceReducer } = reportsPageSlice;
