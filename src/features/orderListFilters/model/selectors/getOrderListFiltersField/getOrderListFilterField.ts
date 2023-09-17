import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderListFilterField = (state: StateSchema) => {
    return state.orderFilters?.sortField;
};