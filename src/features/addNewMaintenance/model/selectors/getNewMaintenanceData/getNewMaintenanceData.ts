import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaintenanceData = (state: StateSchema) => {
    return state.newMaintenance?.newMaintenance;
};