import { StateSchema } from '@/app/providers/StoreProvider';

export const getPossibleParentUnits = (state: StateSchema) => {
    return state.newUnit?.possibleParentUnits;
};