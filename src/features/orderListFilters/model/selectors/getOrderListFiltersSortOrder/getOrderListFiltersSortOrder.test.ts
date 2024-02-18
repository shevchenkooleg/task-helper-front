import { StateSchema } from '@/app/providers/StoreProvider';
import { getOrderListFiltersSortOrder } from './getOrderListFiltersSortOrder';

describe('getOrderListFiltersSortOrder.test', () => {

    const state: DeepPartial<StateSchema> = {
        orderFilters: {
            order: 'asc'
        }
    };

    test('should return orderListFiltersSortOrder', () => {
        expect(getOrderListFiltersSortOrder(state as StateSchema)).toEqual('asc');
    });
    test('must return with empty state', () => {
        expect(getOrderListFiltersSortOrder({} as StateSchema)).toEqual(undefined);
    });
});