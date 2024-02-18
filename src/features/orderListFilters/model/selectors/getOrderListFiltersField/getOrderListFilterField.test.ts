import { StateSchema } from '@/app/providers/StoreProvider';
import { getOrderListFilterField } from './getOrderListFilterField';
import { OrdersSortField } from '@/shared/const/orderConsts';

describe('getOrderListFilterField.test', () => {

    const state: DeepPartial<StateSchema> = {
        orderFilters: {
            sortField: OrdersSortField.ORDER_STATUS
        }
    };

    test('should return orderListFilterField', () => {
        expect(getOrderListFilterField(state as StateSchema)).toEqual('orderStatus');
    });
    test('must return with empty state', () => {
        expect(getOrderListFilterField({} as StateSchema)).toEqual(undefined);
    });
});