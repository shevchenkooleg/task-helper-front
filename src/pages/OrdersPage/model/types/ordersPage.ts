import { Order } from '@/entities/Order';
import { OrderTabHeaderKeys } from '@/features/addNewOrder';

export interface OrdersPageSchema {
    orders: Order[]
    searchInOrders: Order[]
    orderPageTableSettings: {orderTableKeys: OrderTabHeaderKeys[]}
    isLoading: boolean
    error?: string
    _isInit: boolean
}

