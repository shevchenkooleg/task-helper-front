import { Material, MaterialToOrderTab } from '@/entities/Material';

export interface MaterialToOrderSliceSchema {
    error: string
    isLoading: boolean
    materialToOrder: MaterialToOrderTab
    materialToOrderForm: MaterialToOrderTab
    materialList: Array<Material>
}