import {
    getNewMaterialFullVolume
} from './getNewMaterialFullVolume';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getNewMaterialFullVolume.test', () => {

    const state: DeepPartial<StateSchema> = {
        newMaterial: {
            newMaterial: {
                fullVolume: '123'
            }

        }
    };

    test('should return newMaterialFullVolume', () => {
        expect(getNewMaterialFullVolume(state as StateSchema)).toEqual('123');
    });
    test('must return with empty state', () => {
        expect(getNewMaterialFullVolume({} as StateSchema) ).toEqual(undefined);
    });
});