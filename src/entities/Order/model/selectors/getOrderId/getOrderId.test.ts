import { StateSchema } from '@/app/providers/StoreProvider';
import { getOrderId } from './getOrderId';

describe('getOrderId.test', () => {

    const state: DeepPartial<StateSchema> = {
        orderDetails: {
            order: {
                _id: 'qqq'
            }
        }
    };

    test('should return orderId', () => {
        expect(getOrderId(state as StateSchema)).toEqual('qqq');
    });
    test('must return with empty state',()=>{
        expect(getOrderId({} as StateSchema)).toEqual(undefined);
    });
});