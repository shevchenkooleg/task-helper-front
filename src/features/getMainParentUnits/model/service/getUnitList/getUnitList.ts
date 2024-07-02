import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { userActions } from '@/entities/User';
import { Unit } from '@/entities/Unit';


export const getUnitList = createAsyncThunk<Unit[], Record<string,string>, ThunkConfig<string>>(
    'structure/getUnitList',
    async (queryParams, thunkAPI) => {
        const { dispatch, rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        // const queryParams = { 'nestingLevel': '0' };
        // const queryParams = { 'parentId': '66813518b3e332f2cf330b75' };
        // console.log(params);

        try {
            addQueryParams(queryParams);
            const unitsList = await extra.api.get<Unit[]>('/unit/', {
                params: queryParams,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            if (!unitsList.data) {
                throw new Error();
            }
            return unitsList.data;
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