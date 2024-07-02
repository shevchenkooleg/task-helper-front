import { UnitType } from '@/shared/const/unitConsts';

export interface UnitDetailsSliceInterface {
    error: '',
    isLoading: false,
    unit: Unit,
}

export type Unit = EquipmentInterface | TechnicalPlaceInterface;


export interface EquipmentInterface {
    _id?: string
    unitName?: string
    modified?: string
    parentId?: string
    unitKKS?: string
    nestingLevel?: number
    unitType?:UnitType.EQUIPMENT
    unitModel?: string
    serialNumber?: string
    dateOfProduce?: string
    lastMaintenanceDate?: string
    nextMaintenanceDate?: string
}

export interface TechnicalPlaceInterface {
    _id?: string
    unitName?: string
    modified?: string
    parentId?: string
    nestingLevel?: number
    unitType?:UnitType.TECHNICAL_PLACE
}