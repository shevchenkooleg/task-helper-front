import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderId = (state: StateSchema) => {
    return state.orderDetails?.order._id;
};