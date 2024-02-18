import { StateSchema } from '@/app/providers/StoreProvider';
import { getSearchValue } from './getSearchValue';

describe('getSearchValue.test', () => {

    const state:DeepPartial<StateSchema> = {
        orderFilters: {
            search: 'search string value'
        }
    };
    
    test('should return ', () => {
        expect(getSearchValue(state as StateSchema)).toEqual('search string value');
    });
    test('must return with empty state', () => {
        expect(getSearchValue({} as StateSchema)).toEqual(undefined);
    });
});