import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaterialError = (state: StateSchema) => {
    return state.newMaterial?.error;
};