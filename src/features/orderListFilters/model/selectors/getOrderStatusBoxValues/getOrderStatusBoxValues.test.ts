import { OrderStatus } from '@/shared/const/orderConsts';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getOrderStatusBoxValues } from './getOrderStatusBoxValues';

describe('getOrderStatusBoxValues.test', () => {

    const mockedData = { [OrderStatus.AGREEMENT]: true, [OrderStatus.WAITING_FOR_TECHNICAL_CLOSING]: true };

    const state: DeepPartial<StateSchema> = {
        orderFilters: {
            orderStatusBox: mockedData
        }
    };

    test('should return ', () => {
        expect(getOrderStatusBoxValues(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', () => {
        expect(getOrderStatusBoxValues({} as StateSchema)).toEqual(undefined);
    });
});