import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewOrderIsLoading = (state: StateSchema) => (state.newOrder?.isLoading);