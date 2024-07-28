import { StateSchema } from '@/app/providers/StoreProvider';
import { UnitType } from '@/shared/const/unitConsts';

export const getUnitDetailsFormScheduledMaintenanceList = (state: StateSchema) => {
    if (state.unitDetails?.form.unitType === UnitType.EQUIPMENT) return state.unitDetails?.form.scheduledMaintenanceList;
    return undefined;
};