import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaterialFullVolume = (state: StateSchema) => {
    return state.newMaterial?.newMaterial.fullVolume;
};