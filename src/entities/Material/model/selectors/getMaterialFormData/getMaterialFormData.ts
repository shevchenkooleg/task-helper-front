import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialFormData = (state: StateSchema) => {
    return state.materialDetails?.form;
};