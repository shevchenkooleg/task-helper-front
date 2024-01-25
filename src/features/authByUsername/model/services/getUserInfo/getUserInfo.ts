import { userActions, UserInfoResponseInterface } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';


export const getUserInfo = createAsyncThunk<UserInfoResponseInterface, string | null, ThunkConfig<string>>(
    'auth/getUserInfo',
    async (token, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;
        // await dispatch(userActions.initAuthData());

        const accessToken = thunkAPI.getState().user!.tokenAuthData!.access_token ?? token;
        console.log('accessToken ', accessToken);

        try {
            const userInfo = await extra.api.get<UserInfoResponseInterface>('/users/info', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (!userInfo.data) {
                throw new Error();
            }
            console.log('userInfo: ', userInfo);
            dispatch(userActions.setUserData(userInfo.data));
            return userInfo.data;
        } catch (e: any) {
            console.log(e);
            if (e.response && e.response.data === 'Unauthorized'){
                dispatch(userActions.logout());
                return rejectWithValue('Unauthorized');
            }

            return rejectWithValue('error');
        } finally {
            dispatch(userActions.setIsInit());
        }
    }
);