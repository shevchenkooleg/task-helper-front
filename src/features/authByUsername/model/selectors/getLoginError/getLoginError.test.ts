import { getLoginError } from './getLoginError';
import { type StateSchema } from '@/app/providers/StoreProvider';

describe('getLoginError.test', () => {
    test('must return right value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { error: 'some error' }
        };
        expect(getLoginError(state as StateSchema)).toBe('some error');
    });
    test('must return empty string', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginError(state as StateSchema)).toBe('');
    });
});


