import { type StateSchema } from '@/app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('must return right value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { username: 'Username' }
        };
        expect(getLoginUsername(state as StateSchema)).toBe('Username');
    });
    test('must return default empty string', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toBe('');
    });
});


