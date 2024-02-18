import { StateSchema } from '@/app/providers/StoreProvider';
import { getNewOrderIsLoading } from './getNewOrderIsLoading';

describe('getNewOrderIsLoading.test', () => {

    const state: DeepPartial<StateSchema> = {
        newOrder: {
            isLoading: true
        }
    };

    test('should return newOrderIsLoading status', () => {
        expect(getNewOrderIsLoading(state as StateSchema)).toEqual(true);
    });
    test('must return with empty state', () => {
        expect(getNewOrderIsLoading({} as StateSchema)).toEqual(undefined);
    });
});