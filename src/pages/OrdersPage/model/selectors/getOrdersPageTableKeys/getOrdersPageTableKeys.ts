import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrdersPageTableKeys = (state:StateSchema) => {
    return state.orders?.orderPageTableSettings.orderTableKeys;
};