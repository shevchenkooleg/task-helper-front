import { UserRole } from '@/entities/User';
import { AdminPanelMaintenanceItem } from 'src/entities/Maintenance';
import { AdminPanelView } from '@/shared/const/adminPanelConsts';

export interface AdminPanelUserData {
    created?: string
    hashedPassword?: string
    roles?: UserRole[]
    salt?: string
    username: string
    _id: string
}


export type AdminPanelUserType = {[key: string]: AdminPanelUserData}

export interface AdminPanelDataSchema {
    users: AdminPanelUserType
    maintenances?: AdminPanelMaintenanceItem[]
    isLoading: boolean
    error?: string
    view?: AdminPanelView
}