import { StateSchema } from '@/app/providers/StoreProvider';

export const getUnitDetailsFormData = (state: StateSchema) => {
    return state.unitDetails?.form;
};