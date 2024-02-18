import { StateSchema } from '@/app/providers/StoreProvider';
import { getNewOrderError } from './getNewOrderError';

describe('getNewOrderError.test', () => {
    test('should return newOrderError', () => {

        const state: DeepPartial<StateSchema> = {
            newOrder: {
                error: 'someError'
            }
        };

        expect(getNewOrderError(state as StateSchema)).toEqual('someError');
    });
    test('must return with empty state', () => {
        expect(getNewOrderError({} as StateSchema)).toEqual(undefined);
    });
});