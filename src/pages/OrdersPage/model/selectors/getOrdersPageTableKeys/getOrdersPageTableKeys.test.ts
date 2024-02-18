import { StateSchema } from '@/app/providers/StoreProvider';
import { OrderTabHeaderKeys } from '@/shared/const/orderConsts';
import { getOrdersPageTableKeys } from '../../..';

describe('getOrdersPageTableKeys.test', () => {

    const mockedData = [
        OrderTabHeaderKeys.ORDER_ID,
        OrderTabHeaderKeys.MATERIAL_CORRECTIONS,
        OrderTabHeaderKeys._ID
    ];

    const state: DeepPartial<StateSchema> = {
        orders: {
            orderPageTableSettings: {
                orderTableKeys: mockedData
            }
        }
    };

    test('should return ordersPageTableKeys', () => {
        expect(getOrdersPageTableKeys(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', () => {
        expect(getOrdersPageTableKeys({} as StateSchema)).toEqual(undefined);
    });
});