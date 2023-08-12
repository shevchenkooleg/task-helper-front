import { StateSchema } from '@/app/providers/StoreProvider';

export const getEditMode = (state: StateSchema) => {
    return state.orderDetails?.editMode;
};