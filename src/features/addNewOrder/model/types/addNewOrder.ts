import { Order } from '@/entities/Order';

export interface AddNewOrderSliceSchema {
    error: string
    isLoading: boolean
    newOrder: Order
}

