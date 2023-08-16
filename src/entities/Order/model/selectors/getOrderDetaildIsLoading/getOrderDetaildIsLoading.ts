import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderDetaildIsLoading = (state: StateSchema) => {
    return state.orderDetails?.isLoading;
};