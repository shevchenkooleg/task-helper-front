import {
    getAdminPanelIsLoading
} from './getAdminPanelIsLoading';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getAdminPanelIsLoading.test', () => {


    const state: DeepPartial<StateSchema> = {
        adminPanel: {
            isLoading: true
        }
    };

    test('should return ', () => {
        expect(getAdminPanelIsLoading(state as StateSchema)).toEqual(true);
    });
    test('must return with empty state', () => {
        expect(getAdminPanelIsLoading({} as StateSchema)).toEqual(undefined);
    }); 
});