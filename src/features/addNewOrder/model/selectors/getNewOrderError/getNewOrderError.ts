import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewOrderError = (state: StateSchema) => (state.newOrder?.error);