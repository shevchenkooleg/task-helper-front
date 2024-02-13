import { StateSchema } from '@/app/providers/StoreProvider';
import { getOrderDetailIsLoading } from './getOrderDetailIsLoading';

describe('getOrderDetailIsLoading.test', () => {
    test('should return getOrderDetailIsLoading status', () => {
        const state: DeepPartial<StateSchema> = {
            orderDetails: {
                isLoading: true
            }
        };
        expect(getOrderDetailIsLoading(state as StateSchema)).toEqual(true);
    });
    test('must return with empty state', () => {
        expect(getOrderDetailIsLoading({} as StateSchema)).toEqual(undefined);
    });
});