import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaterialDimension = (state: StateSchema) => {
    return state.newMaterial?.newMaterial.dimension;
};