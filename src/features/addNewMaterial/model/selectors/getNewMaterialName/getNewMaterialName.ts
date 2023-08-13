import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaterialName = (state: StateSchema) => {
    return state.newMaterial?.newMaterial.materialName;
};