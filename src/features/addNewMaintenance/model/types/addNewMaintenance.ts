import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';

export interface AddNewMaintenanceSliceSchema {
    isLoading: boolean
    error: string
    newMaintenance: AdminPanelMaintenanceItem
    // replaceableMaintenance: AdminPanelMaintenanceItem[]
    // possibleReplaceableItems: AdminPanelMaintenanceItem[]
}