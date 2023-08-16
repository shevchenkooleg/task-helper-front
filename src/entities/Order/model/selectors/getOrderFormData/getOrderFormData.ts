import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderFormData = (state: StateSchema) => {
    return state.orderDetails?.form;
};