import { StateSchema } from '@/app/providers/StoreProvider';

export const getWriteOffDocuments = (state: StateSchema) => {
    return state.orderDetails?.form.writeOffDocuments;
};