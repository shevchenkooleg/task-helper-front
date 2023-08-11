import { type StateSchema } from '@/app/providers/StoreProvider';
import { type LoginSchema } from '../../types/loginSchema';

export const getLoginState = (state: StateSchema) => {
    const defaultState: LoginSchema = {
        username: '',
        password: '',
        isLoading: false,
        error: ''
    };

    return state?.loginForm || defaultState;
};

