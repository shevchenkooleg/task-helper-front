import { getNewMaterialName } from './getNewMaterialName';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getNewMaterialName.test', () => {

    const state:DeepPartial<StateSchema> = {
        newMaterial: {
            newMaterial: {
                materialName: 'реле РВ-01УХЛ4 220В 50с п/п ТУ 16-523.557-78'
            }
        }
    };

    test('should return newMaterialName', () => {
        expect(getNewMaterialName(state as StateSchema)).toEqual('реле РВ-01УХЛ4 220В 50с п/п ТУ 16-523.557-78');
    });
    test('must return with empty state', () => {
        expect(getNewMaterialName({} as StateSchema)).toEqual(undefined);
    });
});