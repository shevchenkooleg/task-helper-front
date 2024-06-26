import { OrderExecutionType, orderExecutionTypeMapper, OrderType, orderTypeMapper } from './addNewOrderConsts';
import { ExecutionStatus, orderExecutingStatusMapper, OrderStatus, orderStatusMapper } from './orderConsts';

export enum OrderDetailsCardView {
    BASE = 'base',
    UNITS = 'units',
    SCHEDULE = 'schedule',
    CORRECTIONS = 'corrections',
    EXECUTIONS = 'executions',
    MATERIAL = 'material',
}

export const orderDetailsButtonMapper: Record<OrderDetailsCardView, string> = {
    [OrderDetailsCardView.BASE]: 'Основное',
    [OrderDetailsCardView.UNITS]: 'Оборудование',
    [OrderDetailsCardView.SCHEDULE]: 'График',
    [OrderDetailsCardView.CORRECTIONS]: 'Корректировки',
    [OrderDetailsCardView.EXECUTIONS]: 'Выполнения',
    [OrderDetailsCardView.MATERIAL]: 'Материалы',
};

export const orderTypeOptions = [
    { value: OrderType.INDEPENDENT, content: orderTypeMapper.independent },
    { value: OrderType.CONTRACTING, content: orderTypeMapper.contacting },
];

export const orderExecutionTypeOptions = [
    { value: OrderExecutionType.PLANNED, content: orderExecutionTypeMapper.planned },
    { value: OrderExecutionType.UNPLANNED, content: orderExecutionTypeMapper.unplanned },
];

export const orderStatusOptions = [
    { value: OrderStatus.ISSUED, content: orderStatusMapper.issued },
    { value: OrderStatus.WAITING_FOR_REQUEST, content: orderStatusMapper.waiting_for_request },
    { value: OrderStatus.EXECUTING, content: orderStatusMapper.executing },
    { value: OrderStatus.AGREEMENT, content: orderStatusMapper.agreement },
    { value: OrderStatus.WAITING_FOR_TECHNICAL_CLOSING, content: orderStatusMapper.waiting_for_technical_closing },
    { value: OrderStatus.TECHNICAL_CLOSED, content: orderStatusMapper.technical_closed }
];

export const orderExecutionStatusOption = [
    { value: ExecutionStatus.EXECUTING, content: orderExecutingStatusMapper.executing },
    { value: ExecutionStatus.AGREEMENT, content: orderExecutingStatusMapper.agreement },
    { value: ExecutionStatus.WAITING_FOR_TECHNICAL_CLOSING, content: orderExecutingStatusMapper.waiting_for_technical_closing },
    { value: ExecutionStatus.TECHNICAL_CLOSED, content: orderExecutingStatusMapper.technical_closed },
];

export const orderDetailsCardSelectorBtn = [
    { value: OrderDetailsCardView.BASE, content:orderDetailsButtonMapper.base },
    { value: OrderDetailsCardView.UNITS, content:orderDetailsButtonMapper.units },
    { value: OrderDetailsCardView.SCHEDULE, content:orderDetailsButtonMapper.schedule },
    { value: OrderDetailsCardView.CORRECTIONS, content:orderDetailsButtonMapper.corrections },
    { value: OrderDetailsCardView.EXECUTIONS, content:orderDetailsButtonMapper.executions },
    { value: OrderDetailsCardView.MATERIAL, content:orderDetailsButtonMapper.material },
];