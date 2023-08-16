import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialDetailsIsLoading = (state: StateSchema) => {
    return state.materialDetails?.isLoading;
};