import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaterialUPPId = (state: StateSchema) => {
    return state.newMaterial?.newMaterial.UPPId;
};