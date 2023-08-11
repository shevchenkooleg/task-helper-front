import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderData = (state: StateSchema) => {
    return state.orderDetails?.order;
};