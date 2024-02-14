import { StateSchema } from '@/app/providers/StoreProvider';

export const getTokenAuthData = (state: StateSchema) => {
    return state.user?.tokenAuthData?.access_token;
};
