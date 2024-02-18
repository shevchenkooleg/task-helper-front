import { getNewMaterialKSUId } from './getNewMaterialKSUId';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getNewMaterialKSUId.test', () => {

    const state: DeepPartial<StateSchema> = {
        newMaterial: {
            newMaterial: {
                KSUId: '1234567890'
            }
        }
    };

    test('should return newMaterialKSUId', () => {
        expect(getNewMaterialKSUId(state as StateSchema)).toEqual('1234567890');
    });
    test('must return with empty state', () => {
        expect(getNewMaterialKSUId({} as StateSchema)).toEqual(undefined);
    });
});