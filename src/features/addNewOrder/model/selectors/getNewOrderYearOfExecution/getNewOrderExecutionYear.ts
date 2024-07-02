import { StateSchema } from '@/app/providers/StoreProvider';

export const getNewOrderYearOfExecution = (state: StateSchema) => (state.newOrder?.newOrder.yearOfExecution);