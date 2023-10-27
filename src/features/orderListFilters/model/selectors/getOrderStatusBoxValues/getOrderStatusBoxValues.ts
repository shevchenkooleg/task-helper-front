import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderStatusBoxValues = (state: StateSchema) => {
    return state.orderFilters?.orderStatusBox;
};