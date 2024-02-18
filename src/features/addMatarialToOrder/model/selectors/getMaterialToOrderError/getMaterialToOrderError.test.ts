import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getMaterialToOrderError
} from './getMaterialToOrderError';

describe('getMaterialToOrderError.test', () => {

    const state: DeepPartial<StateSchema> = {
        materialToOrder: {
            error: 'some error'
        }
    };

    test('should return error', () => {
        expect(getMaterialToOrderError(state as StateSchema)).toEqual('some error');
    });
    test('must return with empty state', () => {
        expect(getMaterialToOrderError({} as StateSchema)).toEqual(undefined);
    });
});