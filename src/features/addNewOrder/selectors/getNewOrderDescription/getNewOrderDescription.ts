import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewOrderDescription = (state: StateSchema) => (state.newOrder?.newOrder.description);