import { StateSchema } from '@/app/providers/StoreProvider';

export const getParentUnitData = (state: StateSchema) => {
    return state.newUnit?.parentUnit;
};