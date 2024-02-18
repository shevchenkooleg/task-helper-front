import { getMaterialsListSelector } from '../../..';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Material } from '@/entities/Material';
import { Dimension } from '@/entities/Dimension';

describe('getMaterialsList.test', () => {

    const mockedDate: Array<Material> = [
        {
            _id:'64eb40cf4644b0df83341238',
            materialName:'полотно вафельное 45см 200г/м2 ГОСТ 11027-80',
            KSUId:'530115',
            dimension:Dimension.M,
            fullVolume:'1',
            UPPId:'24/00295415',
        }
    ];

    const state: DeepPartial<StateSchema> = {
        materials: {
            searchInMaterials: mockedDate
        }
    };

    test('should return materialsList after search', () => {
        expect(getMaterialsListSelector(state as StateSchema)).toEqual(mockedDate);
    });
    test('must return with empty state', () => {
        expect(getMaterialsListSelector({} as StateSchema)).toEqual(undefined);
    });
});