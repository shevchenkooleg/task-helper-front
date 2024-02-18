import { StateSchema } from '@/app/providers/StoreProvider';
import { getOrderListFiltersYearOfExecution } from '../../..';

describe('getOrderListFiltersYearOfExecution.test', () => {

    const state: DeepPartial<StateSchema> = {
        orderFilters: {
            yearOfExecution: '1987'
        }
    };

    test('should return orderListFiltersYearOfExecution', () => {
        expect(getOrderListFiltersYearOfExecution(state as StateSchema)).toEqual('1987');
    });
    test('must return with empty state', () => {
        expect(getOrderListFiltersYearOfExecution({} as StateSchema)).toEqual(undefined);
    });
});