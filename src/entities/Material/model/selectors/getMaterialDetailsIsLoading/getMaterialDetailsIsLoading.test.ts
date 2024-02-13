import { StateSchema } from '@/app/providers/StoreProvider';
import { getMaterialDetailsIsLoading } from './getMaterialDetailsIsLoading';

describe('getMaterialDetailsIsLoading.test', () => {
    test('should return materialDetailsIsLoading status', () => {
        const state:DeepPartial<StateSchema> = {
            materialDetails: { isLoading: true }
        };
        expect(getMaterialDetailsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('must return with empty state', () => {
        const state:DeepPartial<StateSchema> = {};
        expect(getMaterialDetailsIsLoading(state as StateSchema)).toEqual(undefined);
    });
});