export enum MaterialTabHeaderKeys {
    MATERIAL_NAME = 'materialName',
    KSU_ID = 'KSUId',
    DIMENSION = 'dimension',
    FULL_VOLUME = 'fullVolume',
}

export enum MaterialInOrderTabHeaderKeys {
    QUANTITY_PER_UNIT = 'quantityPerUnit',
    TOTAL_UNITS_COUNT = 'totalUnitsCount',
    TOTAL_QUANTITY = 'totalQuantity',
}

export type MaterialInOrderType = MaterialTabHeaderKeys | MaterialInOrderTabHeaderKeys