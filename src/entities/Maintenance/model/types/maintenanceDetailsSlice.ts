import { MaintenancePeriodicity } from '@/shared/const/maintenanceConsts';

export interface MaintenanceDetailsSliceSchema {
    isLoading?: boolean
    error?: string
    maintenance?: AdminPanelMaintenanceItem[]
}

export interface AdminPanelMaintenanceItem {
    _id?: string
    fullName?: string
    shortName?: string
    periodicity?: MaintenancePeriodicity
    replaceableMaintenanceId?: string[]
}