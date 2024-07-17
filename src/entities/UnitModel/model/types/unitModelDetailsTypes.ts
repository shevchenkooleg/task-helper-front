import { Material } from '@/entities/Material';


export interface UnitDetailsSliceSchema {
    error?: '',
    isLoading?: false,
    unitModel?: UnitModel,
}


export interface UnitModel {
    _id: string;
    name: string;
    materials: Material[]
}

