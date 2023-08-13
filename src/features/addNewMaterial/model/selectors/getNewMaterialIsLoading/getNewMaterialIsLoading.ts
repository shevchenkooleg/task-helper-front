import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaterialIsLoading = (state: StateSchema) => {
    return state.newMaterial?.isLoading;
};