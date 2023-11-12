import { StateSchema } from '@/app/providers/StoreProvider';

export const getSearchValue = (state: StateSchema) => {
    return state.orderFilters?.search;
};