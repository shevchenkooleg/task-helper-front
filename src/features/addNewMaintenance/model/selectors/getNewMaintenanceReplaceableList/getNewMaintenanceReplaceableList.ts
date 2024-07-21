import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaintenanceReplaceableList = (state: StateSchema) => {
    return state.newMaintenance?.replaceableMaintenance;
};