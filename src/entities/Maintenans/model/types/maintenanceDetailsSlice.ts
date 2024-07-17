export interface MaintenanceDetailsSliceSchema {
    isLoading?: boolean
    error?: string
    maintenance?: Maintenance[]
}

export interface Maintenance {
    _id?: string
    fullName?: string
    shortName?: string
    priority?: number
    canReplace?: boolean
}