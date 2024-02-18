import { StateSchema } from '@/app/providers/StoreProvider';
import { Dimension } from '@/entities/Dimension';
import { MaterialToOrderTab } from '@/entities/Material';
import {
    getMaterialToOrderForm
} from './getMaterialToOrderForm';

describe('getMaterialToOrderForm.test', () => {

    const mockedData: MaterialToOrderTab = {
        materialName:'лента ПВХ электроизоляционная с липким слоем 19х0,18ммх20м -50+50С зеленый',
        KSUId:'404891',
        dimension:Dimension.M,
        fullVolume:'20',
        UPPId:'24/00215675',
        materialId:'64ed82b3d21a64e4a0e01ce5',
        quantityPerUnit:'1',
        totalUnitsCount:'1',
        totalQuantity:'1',
    };

    const state: DeepPartial<StateSchema> = {
        materialToOrder:  {
            materialToOrderForm: mockedData
        }
    };

    test('should return materialToOrderForm', () => {
        expect(getMaterialToOrderForm(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', () => {
        expect(getMaterialToOrderForm({} as StateSchema)).toEqual(undefined);
    });
});