import { StateSchema } from '@/app/providers/StoreProvider';

export const getValidationError = (state: StateSchema) => {
    return state.newUnit?.validationError;
};