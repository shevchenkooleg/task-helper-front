import { getNewOrderId } from './getNewOrderId';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getNewOrderId.test', () => {

    const state: DeepPartial<StateSchema> = {
        newOrder: {
            newOrder: {
                orderId: 'orderId'
            }
        }
    };

    test('should return newOrderId', () => {
        expect(getNewOrderId(state as StateSchema)).toEqual('orderId');
    });
    test('must return with empty state', () => {
        expect(getNewOrderId({} as StateSchema)).toEqual(undefined);
    });
});