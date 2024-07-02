import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewUnitData = (state: StateSchema) => {
    return state.newUnit?.newUnit;
};