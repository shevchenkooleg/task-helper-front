import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialToOrderMaterialList = (state: StateSchema) => {
    return state.materialToOrder?.materialList;
};