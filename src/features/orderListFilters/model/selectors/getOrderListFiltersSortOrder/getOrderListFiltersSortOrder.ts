import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderListFiltersSortOrder = (state:StateSchema) => {
    return state.orderFilters?.order;
};