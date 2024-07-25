import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { filterObject } from '@/shared/lib/filterObject/filterObject';


import { Unit } from '../types/unitDetailsTypes';

interface responseInterface  {
    status: string
    unit: Unit
}

interface updateUnitByIdProps {
    updatedUnit: Unit
    unitId: string
}

export const updateUnitById = createAsyncThunk<Unit, updateUnitByIdProps, ThunkConfig<string> >(
    'unitDetails/updateUnitById',
    async ({ unitId, updatedUnit }, thunkAPI) => {
        const { rejectWithValue, extra, getState } = thunkAPI;
        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token;

        const unitForm = filterObject<Unit>(updatedUnit, ['__v', '_id', 'modified']);
        // const materialsForUpdate = orderForm.materials?.map(el=>filterObject(el, ['KSUId', 'dimension', 'fullVolume', 'materialName', '__v',]));
        // console.log('materialsForUpdate ', materialsForUpdate);
        console.log('unitForm ', unitForm);

        try {
            if (!unitId) {
                throw new Error('Unit not defined');
            }
            const response = await extra.api.put<responseInterface, AxiosResponse, Unit>(`/unit/${unitId}`,
                {
                    ...unitForm
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            if (!response.data) {
                throw new Error();
            }
            console.log(response.data.unit);
            return response.data.unit;
            // thunkAPI.dispatch(fetchMaterialDataForOrder(response.data.order));
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }

    }
);