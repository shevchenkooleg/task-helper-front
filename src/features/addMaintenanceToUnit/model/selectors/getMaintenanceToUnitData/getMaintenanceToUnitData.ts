import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaintenanceToUnitData = (state: StateSchema) => {
    return state.addMaintenanceToUnit?.newMaintenance;
};