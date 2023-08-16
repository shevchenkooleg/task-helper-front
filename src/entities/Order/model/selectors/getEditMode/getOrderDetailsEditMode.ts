import { StateSchema } from '@/app/providers/StoreProvider';

export const getOrderDetailsEditMode = (state: StateSchema) => {
    return state.orderDetails?.editMode;
};