import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialDetailsEditMode = (state: StateSchema) => {
    return state.materialDetails?.editMode;
};