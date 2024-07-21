import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaintenanceForAdminPanelSelector = (state: StateSchema) => {
    return state.adminPanel?.maintenances;
};