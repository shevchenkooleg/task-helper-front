import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialData = (state: StateSchema) => {
    return state.materialDetails?.material;
};