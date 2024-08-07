import { UnitType } from '@/shared/const/unitConsts';
import { MaintenancePeriodicity } from '@/shared/const/maintenanceConsts';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';

export interface UnitDetailsSliceSchema {
    error: string,
    isLoading: boolean,
    unit: Unit,
    form: Unit,
    maintenanceDictionary: Maintenance[]
}

export interface MaintenanceLogElement {
    maintenanceDate: string,
    maintenanceType: string,
    reasonOfMaintenance?: string,
    maintenanceResult?: string,
    _orderId?: string,
    _id: string,
}

export interface Maintenance extends AdminPanelMaintenanceItem {
    // _id?: string
    // fullName?: string
    // shortName?: string
    periodicity?: MaintenancePeriodicity
    replaceableMaintenanceId?: string[]
    replaceableMaintenance?: Maintenance[]
}

export type Unit = | EquipmentInterface | TechnicalPlaceInterface;

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
    unitType:UnitType.TECHNICAL_PLACE
    unitKKS?: string
    toroKKS?: string
}