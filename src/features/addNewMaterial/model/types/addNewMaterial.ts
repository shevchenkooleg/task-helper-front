import { Material } from '@/entities/Material';

export interface AddNewMaterialSliceSchema {
    error: string
    isLoading: boolean
    newMaterial: Material
}