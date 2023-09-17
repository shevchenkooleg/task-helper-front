import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrdersPageIsInit = (state: StateSchema) => {
    return state.orders?._isInit;
};