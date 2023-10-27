import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderListFiltersYearOfExecution = (state: StateSchema) => {
    return state.orderFilters?.yearOfExecution;
};