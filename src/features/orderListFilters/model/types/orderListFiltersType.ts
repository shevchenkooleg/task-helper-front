import { SortOrder } from '@/shared/types/sort';
import { OrdersSortField } from '@/shared/const/orderConsts';

export interface OrderStatusSortBox {
    [index: string]: boolean
}

export interface OrderListFiltersSchema {
    isLoading: boolean
    error: string
    sortField: OrdersSortField
    search: string
    order: SortOrder
    yearOfExecution: string
    orderStatusBox: OrderStatusSortBox
    orderStatusBoxForm: OrderStatusSortBox
    // view: OrderView
    // type: OrderType
}