import { Unit } from '@/entities/Unit';

export interface StructurePageSchema {
    error: string,
    isLoading: boolean,
    units: Record<string, Unit[]>,
}