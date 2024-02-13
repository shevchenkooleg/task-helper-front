import { StateSchema } from '@/app/providers/StoreProvider';
import { getMaterialDetailsEditMode } from './getMaterialDetailsEditMode';

describe('getMaterialDetailsEditMode.test', () => {
    test('should return materialDetailsEditMode', () => {
        const state: DeepPartial<StateSchema> = {
            materialDetails: {
                editMode: false
            }
        };
        expect(getMaterialDetailsEditMode(state as StateSchema)).toEqual(false);
    });
    test('must return with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getMaterialDetailsEditMode(state as StateSchema)).toEqual(undefined);
    });
});