import { StateSchema } from '@/app/providers/StoreProvider';

export const getAdminPanelView = (state: StateSchema) => {
    return state.adminPanel?.view;
};