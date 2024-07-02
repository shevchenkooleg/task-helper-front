import { getNewOrderDescription } from './getNewOrderDescription';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getNewOrderDescription.test', () => {
    
    const state: DeepPartial<StateSchema> = {
        newOrder: {
            newOrder: {
                description: 'someText'
            }

        }
    };

    test('should return newOrderDescription', () => {
        expect(getNewOrderDescription(state as StateSchema)).toEqual('someText');
    });
    test('must return with empty state', () => {
        expect(getNewOrderDescription({} as StateSchema)).toEqual(undefined);
    });
});