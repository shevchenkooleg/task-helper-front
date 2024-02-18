import { getNewMaterialUPPId } from './getNewMaterialUPPId';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getNewMaterialUPPId.test', () => {

    const state: DeepPartial<StateSchema> = {
        newMaterial: {
            newMaterial: {
                UPPId: '24/00215675'
            }
        }
    };

    test('should return newMaterialUPPId', () => {
        expect(getNewMaterialUPPId( state as StateSchema)).toEqual('24/00215675');
    });
    test('must return with empty state', () => {
        expect(getNewMaterialUPPId({} as StateSchema)).toEqual(undefined);
    });
});