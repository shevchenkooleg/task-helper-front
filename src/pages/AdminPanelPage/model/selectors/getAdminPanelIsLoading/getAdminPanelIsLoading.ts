import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdminPanelIsLoading = (state: StateSchema) => {
    return state.adminPanel?.isLoading;
};