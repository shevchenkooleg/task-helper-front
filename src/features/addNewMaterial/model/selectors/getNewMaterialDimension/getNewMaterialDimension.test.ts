import { StateSchema } from '@/app/providers/StoreProvider';
import { Dimension } from '@/entities/Dimension';
import {
    getNewMaterialDimension
} from './getNewMaterialDimension';

describe('getNewMaterialDimension.test', () => {

    const state:DeepPartial<StateSchema> = {
        newMaterial: {
            newMaterial: {
                dimension: Dimension.L
            }
        }
    };

    test('should return newMaterialDimension', () => {
        expect(getNewMaterialDimension(state as StateSchema)).toEqual('l');
    });
    test('must return with empty state', () => {
        expect(getNewMaterialDimension({} as StateSchema)).toEqual(undefined);
    });
});