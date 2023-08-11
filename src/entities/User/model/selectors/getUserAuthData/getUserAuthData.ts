import { type StateSchema } from '@/app/providers/StoreProvider';

export const getUserAuthData = (state: StateSchema) => {
    return state.user.userData?.user_id;
};
