import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewMaintenancePeriodicity = (state: StateSchema) => {
    return state.newMaintenance?.newMaintenance.periodicity;
};