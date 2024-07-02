import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UnitType } from '@/shared/const/unitConsts';
import { Unit } from '@/entities/Unit';

interface AddNewUnitProps {
    unitName: string,
    unitType: UnitType,
    parentId: string | null,
}

export const addNewUnit = createAsyncThunk<Unit, AddNewUnitProps, ThunkConfig<string>>(
    'structure/addNewUnit',
    async (newUnitData, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;
        try {

            const newUnit = await extra.api.post<Unit>('/unit/', {
                ...newUnitData
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
            }
            );
            if (!newUnit.data) {
                throw new Error();
            }
            // console.log(newOrder);
            return newUnit.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
        // } finally {
        //     dispatch(userActions.setIsInit());
        // }
    }
);