import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaintenanceId = (state: StateSchema) => {
    return state.newMaintenance?.newMaintenance._id;
};