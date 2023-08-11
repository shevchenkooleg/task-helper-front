import { StateSchema } from '@/app/providers/StoreProvider';

export const getUsersForAdminPanel = (state: StateSchema) => {
    return state.adminPanel?.users;
};
