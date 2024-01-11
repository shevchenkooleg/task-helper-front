
export enum OrderType {
    CONTRACTING = 'contacting',
    INDEPENDENT = 'independent'
}

export enum OrderExecutionType {
    PLANNED = 'planned',
    UNPLANNED = 'unplanned'
}

export const orderTypeMapper: Record<OrderType, string> = {
    [OrderType.INDEPENDENT]: 'Хозяйственный',
    [OrderType.CONTRACTING]: 'Подрядный',
};

export const orderExecutionTypeMapper: Record<OrderExecutionType, string> = {
    [OrderExecutionType.PLANNED]: 'Плановый',
    [OrderExecutionType.UNPLANNED]: 'Неплановый',
};