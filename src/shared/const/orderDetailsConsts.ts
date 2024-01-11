import {
    OrderExecutionType,
    orderExecutionTypeMapper,
    OrderType,
    orderTypeMapper
} from './addNewOrderConsts';

export const orderTypeOptions = [
    { value: OrderType.INDEPENDENT, content: orderTypeMapper.independent },
    { value: OrderType.CONTRACTING, content: orderTypeMapper.contacting },
];

export const orderExecutionTypeOptions = [
    { value: OrderExecutionType.PLANNED, content: orderExecutionTypeMapper.planned },
    { value: OrderExecutionType.UNPLANNED, content: orderExecutionTypeMapper.unplanned },
];