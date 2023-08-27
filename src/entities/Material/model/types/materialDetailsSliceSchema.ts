import { Dimension } from '@/entities/Dimension';

export interface Material {
    _id?: string
    materialName?: string
    KSUId?: string
    dimension?: Dimension
    fullVolume?: string
}

export interface MaterialDetailsSliceSchema {
    isLoading: boolean
    error: string
    editMode: boolean,
    material: Material
    form: Material
}

export interface MaterialToOrderTab extends Material {
    materialId?: string
    quantityPerUnit?: string
    totalUnitsCount?: string
    totalQuantity?: string
}