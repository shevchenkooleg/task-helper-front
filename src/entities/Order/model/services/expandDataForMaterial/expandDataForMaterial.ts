import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Material, MaterialToOrderTab } from '@/entities/Material';


type responseMaterialInterface = {
    material: Array<Material>, _newMaterialInstanceId: string
}


export const expandDataForMaterial = createAsyncThunk<MaterialToOrderTab, MaterialToOrderTab, ThunkConfig<string> >(
    'orderDetails/expandDataForMaterial',
    async (updatedMaterial, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        try {
            if (!updatedMaterial) {
                throw new Error('Material not defined');
            }
            const materialData = await extra.api.get<responseMaterialInterface>('/material', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    materialId: updatedMaterial.materialId
                }
            }
            );

            console.log('response ', materialData.data);
            console.log('updatedMaterial ', updatedMaterial);
            console.log('materialData.data ', materialData.data.material[0]);
            console.log('result ', {
                ...updatedMaterial, ...materialData.data.material[0], _id: materialData.data._newMaterialInstanceId
            });

            return {
                ...updatedMaterial, ...materialData.data.material[0], _id: materialData.data._newMaterialInstanceId
            };

        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);