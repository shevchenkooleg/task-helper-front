import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderStatusBoxFormValues = (state: StateSchema) => {
    return state.orderFilters?.orderStatusBoxForm;
};