import { SortOrder } from '@/shared/types/sort';
import { OrdersSortField } from '@/shared/const/orderConsts';

export interface OrderListFiltersSchema {
    isLoading: boolean
    error: string
    sortField: OrdersSortField
    search: string
    order: SortOrder
    // view: OrderView
    // type: OrderType
}