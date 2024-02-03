import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderFormKS2 = (state: StateSchema) => {
    return state.orderDetails?.form.KS2Documents;
};