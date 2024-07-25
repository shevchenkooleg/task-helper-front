
export enum UnitType {
    TECHNICAL_PLACE = 'technicalPlace',
    EQUIPMENT = 'equipment'
}

export const unitTypeMapper: Record<UnitType, string> = {
    [UnitType.TECHNICAL_PLACE]: 'Техническое место',
    [UnitType.EQUIPMENT]: 'Единица оборудования',
};

export const unitTypeOptions = [
    { value: UnitType.TECHNICAL_PLACE, content: unitTypeMapper.technicalPlace },
    { value: UnitType.EQUIPMENT, content: unitTypeMapper.equipment },
];