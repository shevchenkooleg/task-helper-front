import { UnitType } from '@/shared/const/unitConsts';

export interface UnitDetailsSliceSchema {
    error: '',
    isLoading: false,
    unit: Unit,
    form: Unit,
}

export type Unit = EquipmentInterface | TechnicalPlaceInterface;

export interface MaintenanceLogElement {
    maintenanceDate: string,
    maintenanceType: string,
    reasonOfMaintenance?: string,
    maintenanceResult?: string,
    _orderId?: string,
    _id: string,
}


export interface EquipmentInterface {
    _id?: string
    unitName?: string
    modified?: string
    parentId?: string
    unitKKS?: string
    toroKKS?: string
    nestingLevel?: number
    unitType?:UnitType.EQUIPMENT
    unitModel?: string
    serialNumber?: string
    dateOfProduce?: string
    nextScheduledMaintenanceDate?: {
        maintenanceDate: string
        maintenanceType: string
        _orderId?: string
    }
    maintenanceLog?: MaintenanceLogElement[]
}

export interface TechnicalPlaceInterface {
    _id?: string
    unitName?: string
    modified?: string
    parentId?: string
    nestingLevel?: number
    unitType?:UnitType.TECHNICAL_PLACE
    unitKKS?: string
}