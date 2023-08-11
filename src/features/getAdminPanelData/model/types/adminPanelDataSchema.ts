import { UserRole } from '@/entities/User';

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
    isLoading: boolean
    error?: string
}