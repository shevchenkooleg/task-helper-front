import { type StateSchema } from '@/app/providers/StoreProvider';

export const getUserAuthData = (state: StateSchema) => {
    return state.user?.userData?.user_id;
};

export const getUserCredential = (state: StateSchema) => {
    return state.user?.userData?.userCredentials;
};