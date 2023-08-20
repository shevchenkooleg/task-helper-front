import { Order } from '@/entities/Order';

export interface OrdersPageSchema {
    orders: Order[]
    isLoading: boolean
    error?: string
}

