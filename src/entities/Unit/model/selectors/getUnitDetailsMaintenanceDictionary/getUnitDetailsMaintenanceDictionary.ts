import { StateSchema } from '@/app/providers/StoreProvider';

export const getUnitDetailsMaintenanceDictionary = (state: StateSchema) => {
    return state.unitDetails?.maintenanceDictionary;
};