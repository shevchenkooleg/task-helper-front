import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Material, MaterialDetailsSliceSchema } from '../types/materialDetailsSliceSchema';
import { fetchMaterialById } from '../services/fetchMaterialById/fetchMaterialById';
import { updateMaterialById } from '../services/updateMaterialById/updateMaterialById';
import { deleteMaterialById } from '../services/deleteMaterialById/deleteMaterialById';

const initialState: MaterialDetailsSliceSchema = {
    isLoading: false,
    error: '',
    editMode: false,
    material: {} as Material,
    form: {} as Material,
};

export const materialDetailsSlice = createSlice({
    name: 'materialDetailsSlice',
    initialState,
    reducers: {
        setEditMode: (state, action: PayloadAction<boolean>)=>{
            state.editMode = action.payload;
        },
        updateMaterialForm: (state, action: PayloadAction<Material>) => {
            state.form = {
                ...state.form,
                ...action.payload
            };
        },
        rollBackForm: (state)=>{
            state.form = { ...state.material };
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterialById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchMaterialById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.material = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchMaterialById.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload){
                    state.error = action.payload;
                }
            })
            .addCase(updateMaterialById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(updateMaterialById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editMode = false;
                state.material = action.payload;
                state.form = action.payload;
            })
            .addCase(updateMaterialById.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload){
                    state.error = action.payload;
                }
            })
            .addCase(deleteMaterialById.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(deleteMaterialById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editMode = false;
            })
            .addCase(deleteMaterialById.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload){
                    state.error = action.payload;
                }
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: materialDetailsSliceActions } = materialDetailsSlice;
export const { reducer: materialDetailsSliceReducer } = materialDetailsSlice;
