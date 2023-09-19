import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Material, MaterialToOrderTab } from '@/entities/Material';
import { MaterialToOrderSliceSchema } from '../types/materiaToOrderlSliceSchema';
import {
    fetchMaterialsForComboBox
} from '../services/fetchMaterialsForComboBox/fetchMaterialsForComboBox';
import { filterObject } from '@/shared/lib/filterObject/filterObject';

const initialState: MaterialToOrderSliceSchema = {
    error: '',
    isLoading: false,
    materialToOrder: {} as MaterialToOrderTab,
    materialToOrderForm: {} as MaterialToOrderTab,
    materialList: []
};

export const materialToOrderSlice = createSlice({
    name: 'materialToOrderSlice',
    initialState,
    reducers: {
        setMaterialToOrderFormData: (state, action: PayloadAction<Material>)=>{
            state.materialToOrderForm = { ...state.materialToOrderForm, ...filterObject(action.payload, ['_id']), materialId:action.payload._id };
        },
        setMaterialId: (state, action)=>{
            state.materialToOrderForm.materialId = action.payload;
        },
        setQuantityPerUnit: (state, action)=>{
            state.materialToOrderForm.quantityPerUnit = action.payload;
            if (state.materialToOrderForm.totalUnitsCount){
                state.materialToOrderForm.totalQuantity =
                    String((Number(state.materialToOrderForm.totalUnitsCount) * Number(action.payload)).toFixed(3)).replace('.000', '');
            }
        },
        setTotalUnitsCount: (state, action)=>{
            state.materialToOrderForm.totalUnitsCount = action.payload;
            if (state.materialToOrderForm.quantityPerUnit){
                state.materialToOrderForm.totalQuantity =
                    String((Number(state.materialToOrderForm.quantityPerUnit) * Number(action.payload)).toFixed(3)).replace('.000', '');
            }
        },
        setMaterialToOrderForm: (state, action: PayloadAction<MaterialToOrderTab>) => {
            state.materialToOrderForm = action.payload;
        },
        resetForm: (state)=>{
            state.materialToOrderForm = state.materialToOrder;
        }
        // setNewMaterialDimension: (state, action) => {
        //     state.newMaterial.dimension = action.payload;
        // },
        // setNewMaterialFullVolume: (state, action) => {
        //     state.newMaterial.fullVolume = action.payload;
        // },
        // resetForm: (state) => {
        //     state.newMaterial.materialName = '';
        //     state.newMaterial.KSUId = '';
        //     state.newMaterial.dimension = Dimension.NONE;
        //     state.newMaterial.fullVolume = '';
        // }
    },


    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterialsForComboBox.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(fetchMaterialsForComboBox.fulfilled, (state, action) => {
                state.isLoading = false;
                state.materialList = action.payload;

            })
            .addCase(fetchMaterialsForComboBox.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload){
                    state.error = action.payload;
                }
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: materialToOrderSliceActions } = materialToOrderSlice;
export const { reducer: materialToOrderSliceReducer } = materialToOrderSlice;
