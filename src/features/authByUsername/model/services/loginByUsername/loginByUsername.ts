import { createAsyncThunk } from '@reduxjs/toolkit';
import { TokenResponseInterface, userActions } from '@/entities/User';
import { USER_REFRESH_TOKEN_LOCALSTORAGE_KEY, USER_TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserInfo } from '../../..';


interface loginByUsernameProps {
    username: string
    password: string
}

const clientCredentials = {
    clientId: 'android',
    clientSecret: 'SomeRandomCharsAndNumbers'
};


export const loginByUsername = createAsyncThunk<TokenResponseInterface, loginByUsernameProps, ThunkConfig<string> >(
    'common/loginByUserName',
    async (authData, thunkAPI) => {
        const { dispatch, rejectWithValue, extra } = thunkAPI;

        try {
            const response = await extra.api.post<TokenResponseInterface>('/oauth/token', {
                grant_type: 'password', ...authData, ...clientCredentials
            });
            if (!response.data) {
                throw new Error();
            }
            const responseData:TokenResponseInterface = response.data;
            localStorage.setItem(USER_TOKEN_LOCALSTORAGE_KEY, JSON.stringify(responseData.access_token));
            localStorage.setItem(USER_REFRESH_TOKEN_LOCALSTORAGE_KEY, JSON.stringify(responseData.refresh_token));
            dispatch(userActions.setTokenAuthData(responseData));
            dispatch(getUserInfo(null));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    }
);
