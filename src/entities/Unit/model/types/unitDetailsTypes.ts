export interface UnitDetailsSliceInterface {
    error: '',
    isLoading: false,
    unit: UnitInterface,
}

export type UnitInterface = EquipmentInterface | TechnicalPlaceInterface;


export interface EquipmentInterface {
    _id?: string
    unitName?: string
    modified?: string
    description?: string
    parentId?: string
    nestingLevel?: number
    unitType?:'equipment'
    unitModel?: string
    lastMaintenanceDate?: string
    nextMaintenanceDate?: string
}

export interface TechnicalPlaceInterface {
    _id?: string
    unitName?: string
    modified?: string
    description?: string
    parentId?: string
    nestingLevel?: number
    unitType?:'technicalPlace'
}