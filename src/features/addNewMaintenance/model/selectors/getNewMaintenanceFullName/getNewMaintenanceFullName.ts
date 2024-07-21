import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaintenanceFullName = (state: StateSchema) => {
    return state.newMaintenance?.newMaintenance.fullName;
};