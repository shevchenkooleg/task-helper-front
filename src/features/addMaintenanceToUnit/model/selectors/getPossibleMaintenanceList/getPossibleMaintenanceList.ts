import { StateSchema } from '@/app/providers/StoreProvider';

export const getPossibleMaintenanceList = (state: StateSchema) => {
    return state.addMaintenanceToUnit?.possibleMaintenanceToAdd;
};