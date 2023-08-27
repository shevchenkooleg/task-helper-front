import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialToOrderForm = (state: StateSchema) => {
    return state.materialToOrder?.materialToOrderForm;
};