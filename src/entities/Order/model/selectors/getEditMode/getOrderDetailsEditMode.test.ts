import { StateSchema } from '@/app/providers/StoreProvider';
import { getOrderDetailsEditMode } from './getOrderDetailsEditMode';

describe('getOrderDetailsEditMode.test', () => {
    test('should return orderDetailsEditMode', () => {
        const state:DeepPartial<StateSchema> = {
            orderDetails: {
                editMode: true
            }
        };

        expect(getOrderDetailsEditMode(state as StateSchema)).toEqual(true);
    });
    test('must return with empty state', () => {

        expect(getOrderDetailsEditMode({} as StateSchema)).toEqual(undefined);
    });
});