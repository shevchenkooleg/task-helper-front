import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Dimension } from '@/entities/Dimension';
import { Material } from '@/entities/Material';

interface AddNewMaterialProps {
    materialName: string
    KSUId: string
    UPPId: string
    dimension: Dimension
    fullVolume: string
}

export const addNewMaterial = createAsyncThunk<Material, AddNewMaterialProps, ThunkConfig<string>>(
    'material/addNewMaterial',
    async (newMaterialData, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        try {

            const newMaterial = await extra.api.post<Material>('/material/', {
                ...newMaterialData
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
            );
            if (!newMaterial.data) {
                throw new Error();
            }
            return newMaterial.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        } finally {
            dispatch(userActions.setIsInit());
        }
    }
);