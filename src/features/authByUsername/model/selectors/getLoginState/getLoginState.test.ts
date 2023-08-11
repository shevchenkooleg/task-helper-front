import { type StateSchema } from '@/app/providers/StoreProvider';
import { getLoginState } from './getLoginState';
import { type LoginSchema } from '../../types/loginSchema';

describe('getLoginState.test', () => {
    test('must return right value', () => {
        const userData: LoginSchema = {
            username: 'Username',
            password: '123',
            isLoading: true,
            error: 'some error'
        };

        const state: DeepPartial<StateSchema> = {
            loginForm: userData
        };
        expect(getLoginState(state as StateSchema)).toEqual(userData);
    });
    test('must return default empty string', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginState(state as StateSchema)).toEqual({
            username: '',
            password: '',
            isLoading: false,
            error: ''
        });
    });
});


