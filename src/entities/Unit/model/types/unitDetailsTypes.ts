import { UnitType } from '@/shared/const/unitConsts';
import { MaintenancePeriodicity } from '@/shared/const/maintenanceConsts';

export interface UnitDetailsSliceSchema {
    error: '',
    isLoading: false,
    unit: Unit,
    form: Unit,
}

export interface MaintenanceLogElement {
    maintenanceDate: string,
    maintenanceType: string,
    reasonOfMaintenance?: string,
    maintenanceResult?: string,
    _orderId?: string,
    _id: string,
}

export interface Maintenance {
    _id?: string
    fullName?: string
    shortName?: string
    periodicity?: MaintenancePeriodicity
    replaceableMaintenanceId?: string[]
}

export type Unit = EquipmentInterface | TechnicalPlaceInterface;

export type EquipmentInterface = {
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
    scheduledMaintenanceList?: Maintenance[]
    nextScheduledMaintenanceDate?: {
        maintenanceDate: string
        maintenanceType: string
        _orderId?: string
    }
    maintenanceLog?: MaintenanceLogElement[]
}

export type TechnicalPlaceInterface = {
    _id?: string
    unitName?: string
    modified?: string
    parentId?: string
    nestingLevel?: number
    unitType?:UnitType.TECHNICAL_PLACE
    unitKKS?: string
}