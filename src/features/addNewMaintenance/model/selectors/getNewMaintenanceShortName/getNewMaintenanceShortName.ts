import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaintenanceShortName = (state: StateSchema) => {
    return state.newMaintenance?.newMaintenance.shortName;
};