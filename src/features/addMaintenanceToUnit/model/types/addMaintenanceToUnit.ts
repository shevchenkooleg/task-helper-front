import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';
import { Maintenance } from '@/entities/Unit';



export interface AddMaintenanceToUnitSliceSchema {
    isLoading?: boolean
    error?: string
    newMaintenance: Maintenance
    possibleMaintenanceToAdd: AdminPanelMaintenanceItem[]
}