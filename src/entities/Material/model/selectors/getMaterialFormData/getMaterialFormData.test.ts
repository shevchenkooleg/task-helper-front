import { Dimension } from '@/entities/Dimension';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getMaterialFormData } from '../../..';

describe('getMaterialFormData.test', () => {
    test('should return materialFormData', () => {
        const material = {
            _id: '64eb40cf4644b0df83341238',
            materialName: 'полотно вафельное 45см 200г/м2 ГОСТ 11027-80',
            KSUId: '530115',
            dimension: Dimension.M,
            fullVolume: '1',
            UPPId: '24/00295415',
        };
        const state:DeepPartial<StateSchema> = {
            materialDetails: {
                form: material
            }
        };
        expect(getMaterialFormData(state as StateSchema)).toEqual(material);
    });
    test('must return with empty state', () => {
        const state = {};
        expect(getMaterialFormData(state as StateSchema)).toEqual(undefined);
    });
});