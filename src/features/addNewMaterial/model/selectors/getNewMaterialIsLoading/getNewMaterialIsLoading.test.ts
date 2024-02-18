import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getNewMaterialIsLoading
} from './getNewMaterialIsLoading';

describe('getNewMaterialIsLoading.test', () => {
    test('should return newMaterialIsLoading status', () => {

        const state: DeepPartial<StateSchema> = {
            newMaterial: {
                isLoading: true
            }
        };

        expect(getNewMaterialIsLoading(state as StateSchema)).toEqual(true);
    });
    test('must return with empty state', () => {
        expect(getNewMaterialIsLoading({} as StateSchema)).toEqual(undefined);
    });
});