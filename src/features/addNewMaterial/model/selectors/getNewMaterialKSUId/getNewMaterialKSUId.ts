import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaterialKSUId = (state: StateSchema) => {
    return state.newMaterial?.newMaterial.KSUId;
};