import { Material } from '@/entities/Material';

export interface MaterialsPageSchema {
    error: string,
    isLoading: boolean,
    materials: Material[]
    searchInMaterials: Material[]
}