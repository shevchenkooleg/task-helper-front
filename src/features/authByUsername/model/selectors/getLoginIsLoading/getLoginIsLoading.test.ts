import { type StateSchema } from '@/app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';


describe('getLoginIsLoading.test', () => {
    test('must return right value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { isLoading: true }
        };
        expect(getLoginIsLoading(state as StateSchema)).toBe(true);
    });
    test('must return default (false) value', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginIsLoading(state as StateSchema)).toBe(false);
    });
});

