import { StateSchema } from '@/app/providers/StoreProvider';
import { getMaterialData } from './getMaterialData';
import { Dimension } from '@/entities/Dimension';

describe('getMaterialData.test', () => {
    test('should return materialData', () => {
        const material = {
            _id: '64eb40cf4644b0df83341238',
            materialName: 'полотно вафельное 45см 200г/м2 ГОСТ 11027-80',
            KSUId: '530115',
            dimension: Dimension.M,
            fullVolume: '1',
            UPPId: '24/00295415',
        };
        const state: DeepPartial<StateSchema> = {
            materialDetails: {
                isLoading: false,
                editMode: false,
                error: '',
                form: material,
                material: material,
            }
        };
        expect(getMaterialData(state as StateSchema)).toEqual(material);
    });
    test('must return with empty state', ()=>{
        expect(getMaterialData({} as StateSchema)).toEqual(undefined);
    });
});