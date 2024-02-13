import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderDetailIsLoading = (state: StateSchema) => {
    return state.orderDetails?.isLoading;
};