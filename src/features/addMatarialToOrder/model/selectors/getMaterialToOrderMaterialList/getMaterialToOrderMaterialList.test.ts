import { Material } from '@/entities/Material';
import { Dimension } from '@/entities/Dimension';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getMaterialToOrderMaterialList
} from './getMaterialToOrderMaterialList';

describe('getMaterialToOrderMaterialList.test', () => {
    test('should return materialToOrderMaterialList', () => {

        const mockedData: Array<Material> = [
            {
                _id:'65c1ece3bae9e22bb62de193',
                materialName:'реле РВ-01УХЛ4 220В 50с п/п ТУ 16-523.557-78',
                KSUId:'334915',
                UPPId:'08/00029351',
                dimension:Dimension.UNIT,
                fullVolume:'1',
            },
            {
                _id:'65c1edffbae9e22bb62de1af',
                materialName:'реле РВ-01УХЛ4 220В 50/60Гц 50с п/п ТУ 16-523.557-78',
                KSUId:'336437',
                UPPId:'24/00077647',
                dimension:Dimension.UNIT,
                fullVolume:'1',
            },
            {
                _id:'65c1ee17bae9e22bb62de1b6',
                materialName:'реле РВ-03УХЛ4 220В 10с п/п ТУ 16-523.577-79',
                KSUId:'334901',
                UPPId:'08/00019699',
                dimension:Dimension.UNIT,
                fullVolume:'1',
            }
        ];

        const state:DeepPartial<StateSchema> = {
            materialToOrder: {
                materialList: mockedData
            }
        };


        expect(getMaterialToOrderMaterialList(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', () => {
        expect(getMaterialToOrderMaterialList({} as StateSchema)).toEqual(undefined);
    });
});