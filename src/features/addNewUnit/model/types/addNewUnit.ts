import { Unit } from '@/entities/Unit';

export interface AddNewUnitSliceSchema {
    error: string
    isLoading: boolean
    newUnit: Unit
    parentUnit: Unit
    possibleParentUnits: Unit[]
    validationError: boolean
}