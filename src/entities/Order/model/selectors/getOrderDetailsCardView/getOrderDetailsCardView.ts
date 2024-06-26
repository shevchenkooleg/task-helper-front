import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderDetailsCardView = (state: StateSchema) => {
    return state.orderDetails?.view;
};