import { StateSchema } from '@/app/providers/StoreProvider';
import { OrderStatus } from '@/shared/const/orderConsts';
import { getOrderStatusBoxFormValues } from './getOrderStatusBoxFormValues';

describe('getOrderStatusBoxFormValues.test', () => {

    const mockedData = { [OrderStatus.EXECUTING]: true, [OrderStatus.TECHNICAL_CLOSED]: true };

    const state: DeepPartial<StateSchema> = {
        orderFilters: {
            orderStatusBoxForm: mockedData
        }
    };

    test('should return orderStatusBoxFormValues', () => {
        expect(getOrderStatusBoxFormValues(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', () => {
        expect(getOrderStatusBoxFormValues({} as StateSchema)).toEqual(undefined);
    }); 
});