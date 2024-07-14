import { StateSchema } from '@/app/providers/StoreProvider';

export const getUnitDetailsData = (state: StateSchema) => {
    return state.unitDetails?.unit;
};