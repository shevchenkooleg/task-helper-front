import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsLoading = (state:StateSchema) => {
    return state.newMaintenance?.isLoading;
};