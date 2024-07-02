import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions } from '@/entities/User';
import { Unit } from '@/entities/Unit';

export const fetchParentForNewUnit = createAsyncThunk<Unit[], string, ThunkConfig<string>>(
    'structure/fetchParentForNewUnit',
    async (query, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        if (!query){
            return [];
        }

        try {
            const unitList = await extra.api.get<[Unit]>('/unit/search/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    searchQuery: query
                }
            }
            );
            if (!unitList.data) {
                throw new Error();
            }
            console.log(unitList);
            return unitList.data;
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