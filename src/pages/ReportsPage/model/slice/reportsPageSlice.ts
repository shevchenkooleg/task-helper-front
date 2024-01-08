import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportsPageSchema } from '../types/reportsPage';
import { MaterialToReportTab } from '@/entities/Material';

const initialState: ReportsPageSchema = {
    error: '',
    totalVolumeMaterialReport: [],
    _isInit: false,
    isLoading: false,
    reportPageSettings: ''
};

export const reportsPageSlice = createSlice({
    name: 'reportsPageSlice',
    initialState,
    reducers: {
        setTotalVolumeMaterialReport: (state, action: PayloadAction<MaterialToReportTab[]>) => {
            state.totalVolumeMaterialReport = action.payload;
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
