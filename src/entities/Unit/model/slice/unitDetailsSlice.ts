import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Unit, UnitDetailsSliceSchema } from '../types/unitDetailsTypes';

const initialState: UnitDetailsSliceSchema = {
    error:'',
    unit: {},
    form: {},
    isLoading: false,
};

export const UnitDetailsSlice = createSlice({
    name: 'UnitDetailsSlice',
    initialState,
    reducers: {
        setUnitDetailsData: (state, action:PayloadAction<Unit>)=>{
            state.unit = action.payload;
            state.form = action.payload;
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
export const { actions: UnitDetailsSliceActions } = UnitDetailsSlice;
export const { reducer: UnitDetailsSliceReducer } = UnitDetailsSlice;
