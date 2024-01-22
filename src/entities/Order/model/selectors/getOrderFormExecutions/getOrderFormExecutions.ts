import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderFormExecutions = (state: StateSchema) => {
    return state.orderDetails?.form.executions;
};