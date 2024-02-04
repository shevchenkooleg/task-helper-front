import {
    OrderExecutionType,
    orderExecutionTypeMapper,
    OrderType,
    orderTypeMapper
} from './addNewOrderConsts';
import { OrderStatus, orderStatusMapper } from './orderConsts';

export const orderTypeOptions = [
    { value: OrderType.INDEPENDENT, content: orderTypeMapper.independent },
    { value: OrderType.CONTRACTING, content: orderTypeMapper.contacting },
];

export const orderExecutionTypeOptions = [
    { value: OrderExecutionType.PLANNED, content: orderExecutionTypeMapper.planned },
    { value: OrderExecutionType.UNPLANNED, content: orderExecutionTypeMapper.unplanned },
];

export const orderExecutionStatusOption = [
    { value: OrderStatus.ISSUED, content: orderStatusMapper.issued },
    { value: OrderStatus.EXECUTING, content: orderStatusMapper.executing },
    { value: OrderStatus.AGREEMENT, content: orderStatusMapper.agreement },
    { value: OrderStatus.WAITING_FOR_TECHNICAL_CLOSING, content: orderStatusMapper.waiting_for_technical_closing },
    { value: OrderStatus.TECHNICAL_CLOSED, content: orderStatusMapper.technical_closed }
];