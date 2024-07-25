import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions } from '@/entities/User';
import { Unit } from '@/entities/Unit';


export const fetchUnitById = createAsyncThunk<Unit, string, ThunkConfig<string>>(
    'structure/fetchUnitById',
    async (unitId, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        try {
            if (!unitId) {
                throw new Error('Order not defined');
            }
            const updatedUnit = await extra.api.get<Unit>(`/unit/${unitId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!updatedUnit.data) {
                throw new Error();
            }
            return updatedUnit.data;
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