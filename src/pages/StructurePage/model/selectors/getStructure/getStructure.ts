import { StateSchema } from '@/app/providers/StoreProvider';

export const getStructure = (state: StateSchema) => {
    return state.structure?.units;
};