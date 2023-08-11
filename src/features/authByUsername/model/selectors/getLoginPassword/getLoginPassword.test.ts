import { type StateSchema } from '@/app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
    test('must return right value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { password: '123abc' }
        };
        expect(getLoginPassword(state as StateSchema)).toBe('123abc');
    });
    test('must return default empty string', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toBe('');
    });
});


