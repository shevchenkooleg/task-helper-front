import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewOrderId = (state: StateSchema)=>(state.newOrder?.newOrder.orderId);