import { StateSchema } from '@/app/providers/StoreProvider';
import { getNewMaterialError } from './getNewMaterialError';

describe('getNewMaterialError.test', () => {

    const state: DeepPartial<StateSchema> = {
        newMaterial: {
            error: 'some error'
        }
    };

    test('should return newMaterialError', () => {
        expect(getNewMaterialError(state as StateSchema)).toEqual('some error');
    });
    test('must return with empty state', () => {
        expect(getNewMaterialError({} as StateSchema)).toEqual(undefined);
    });
});