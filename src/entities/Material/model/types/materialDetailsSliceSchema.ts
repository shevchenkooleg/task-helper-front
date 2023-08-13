import { Dimension } from '@/entities/Dimension';

export interface Material {
    _id: string
    materialName: string
    KSUId: string
    dimension: Dimension
    fullVolume: string
}

export interface MaterialDetailsSliceSchema {
    isLoading: boolean
    error: string
    newMaterial: Material
}