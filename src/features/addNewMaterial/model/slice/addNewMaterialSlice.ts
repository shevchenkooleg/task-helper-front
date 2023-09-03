import { createSlice } from '@reduxjs/toolkit';
import { AddNewMaterialSliceSchema } from '../types/addNewMaterial';
import { Material } from '@/entities/Material';
import { Dimension } from '@/entities/Dimension';

const initialState: AddNewMaterialSliceSchema = {
    error: '',
    isLoading: false,
    newMaterial: {} as Material
};

export const AddNewMaterialSlice = createSlice({
    name: 'AddNewMaterialSlice',
    initialState,
    reducers: {
        setNewMaterialName: (state, action)=>{
            state.newMaterial.materialName = action.payload;
        },
        setNewMaterialKSUId: (state, action)=>{
            state.newMaterial.KSUId = action.payload;
        },
        setNewMaterialUPPId: (state, action)=>{
            state.newMaterial.UPPId = action.payload;
        },
        setNewMaterialDimension: (state, action) => {
            state.newMaterial.dimension = action.payload;
        },
        setNewMaterialFullVolume: (state, action) => {
            state.newMaterial.fullVolume = action.payload;
        },
        resetForm: (state) => {
            state.newMaterial.materialName = '';
            state.newMaterial.KSUId = '';
            state.newMaterial.UPPId = '';
            state.newMaterial.dimension = Dimension.NONE;
            state.newMaterial.fullVolume = '';
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
export const { actions: AddNewMaterialSliceActions } = AddNewMaterialSlice;
export const { reducer: AddNewMaterialSliceReducer } = AddNewMaterialSlice;
