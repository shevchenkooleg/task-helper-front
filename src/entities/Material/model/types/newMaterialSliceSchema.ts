import { materialDimension } from '../const/materialDimension';

export interface Material {
    _id: string
    name: string
    KSUId: string
    dimension: materialDimension
    fullVolume: number
}

export interface newMaterialSliceSchema {
    isLoading: boolean
    error: string
    newMaterial: Material
}