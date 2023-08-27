import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialToOrderError = (state: StateSchema) => {
    return state.materialToOrder?.error;
};