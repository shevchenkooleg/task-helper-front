import { Order } from '@/entities/Order';

export interface OrdersPageSchema {
    orders: Order[]
    searchInOrders: Order[]
    isLoading: boolean
    error?: string
    _isInit: boolean
}

