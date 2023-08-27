import { userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Material } from '@/entities/Material';


export const fetchMaterialsForComboBox = createAsyncThunk<Material[], string, ThunkConfig<string>>(
    'order/fetchMaterialsForComboBox',
    async (query, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        if (!query){
            return [];
        }

        try {
            const materialList = await extra.api.get<[Material]>('/material/search', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    searchQuery: query
                }
            }
            );
            if (!materialList.data) {
                throw new Error();
            }
            console.log(materialList);
            return materialList.data;
        } catch (e: any) {
            console.log(e);
            if (e.response.data === 'Unauthorized'){
                dispatch(userActions.logout());
                return rejectWithValue('Unauthorized');
            }
            return rejectWithValue('error');
        }
    }
);