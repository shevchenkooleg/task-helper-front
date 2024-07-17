import { UserRole } from '@/entities/User';
import { Maintenance } from '@/entities/Maintenans';
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
    maintenances?: Maintenance[]
    isLoading: boolean
    error?: string
    view?: AdminPanelView
}