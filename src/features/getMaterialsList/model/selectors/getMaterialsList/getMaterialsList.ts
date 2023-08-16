import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialsListSelector = (state: StateSchema) =>{
    return state.materials?.materials;
};