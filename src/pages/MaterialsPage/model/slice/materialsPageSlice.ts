import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialsPageSchema } from '../types/materialsPageSchema';
import { getMaterialsList } from '@/features/getMaterialsList';
import { filterObject } from '@/shared/lib/filterObject/filterObject';
import { Material } from '@/entities/Material';

const initialState: MaterialsPageSchema = {
    error: '',
    isLoading: false,
    materials: [],
    searchInMaterials: []
};

export const materialsPageSlice = createSlice({
    name: 'materialsPageSlice',
    initialState,
    reducers: {
        searchInMaterials: (state, action:PayloadAction<string>)=>{
            if (action.payload === ''){
                state.searchInMaterials = [ ...state.materials ];
            } else {
                state.searchInMaterials = state.materials;
                const reg = new RegExp(action.payload.toLowerCase());
                const result: Material[] = [];
                state.searchInMaterials.map(material=>{
                    const materialsForSearch: Material = filterObject(material, ['_id', 'dimension', 'fullVolume', '__v']);
                    const values = Object.values(materialsForSearch);
                    let matchingFlag = false;

                    function findMatch(el: string){
                        if (reg.test(el.toLowerCase())){
                            result.push(material);
                            matchingFlag = true;
                        }
                    }
                    values.forEach((el)=>{
                        if (matchingFlag) return;
                        findMatch(el);
                    });
                });
                state.searchInMaterials = [ ...result ];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMaterialsList.pending, (state) => {
                state.error = '';
                state.isLoading = true;
            })
            .addCase(getMaterialsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.materials = action.payload;
                state.searchInMaterials = action.payload;
            })
            .addCase(getMaterialsList.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload){
                    state.error = action.payload;
                }
            });
    }
});

// Action creators are generated for each case reducer function
export const { actions: materialsPageSliceActions } = materialsPageSlice;
export const { reducer: materialsPageSliceReducer } = materialsPageSlice;
