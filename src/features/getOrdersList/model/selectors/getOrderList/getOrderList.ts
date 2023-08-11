import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderListSelector = (state: StateSchema) => {
    return state.orders?.orders;
};
