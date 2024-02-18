import { getOrdersPageIsInit } from '../../..';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getOrdersPageIsInit.test', () => {

    const state: DeepPartial<StateSchema> = {
        orders: {
            _isInit: true
        }
    };

    test('should return ', () => {
        expect(getOrdersPageIsInit(state as StateSchema)).toEqual(true );
    });
    test('must return with empty state', () => {
        expect(getOrdersPageIsInit({} as StateSchema)).toEqual(undefined);
    }); 
});