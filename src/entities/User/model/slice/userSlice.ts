import { USER_REFRESH_TOKEN_LOCALSTORAGE_KEY, USER_TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { buildSlice } from '@/shared/lib/store';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../../../shared/const/userConsts';
import { TokenResponseInterface, User, UserInfoResponseInterface, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _isInit: false,
    userData: {} as User,
    error: '',
    isLoading: false
};

export const userSlice = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokenAuthData: (state, action: PayloadAction<TokenResponseInterface>) => {
            state.tokenAuthData = action.payload;
        },
        setUserData: (state, action: PayloadAction<UserInfoResponseInterface>) => {
            if (state.userData){
                state.userData.user_id = action.payload.user_id;
                state.userData.name = action.payload.name;
                if (action.payload.roles){
                    state.userData.roles = [...action.payload.roles] as UserRole[];
                }
            }
        },
        initAuthData: (state) => {
            const user_token = localStorage.getItem(USER_TOKEN_LOCALSTORAGE_KEY);
            const refresh_token = localStorage.getItem(USER_REFRESH_TOKEN_LOCALSTORAGE_KEY);
            if (user_token && refresh_token) {
                state.tokenAuthData = {
                    access_token: JSON.parse(user_token),
                    refresh_token: JSON.parse(refresh_token),
                };
            }
        },
        setIsInit: (state)=>{
            state._isInit = true;
        },
        logout: (state) => {
            state.tokenAuthData = {};
            state.userData = {} as User;
            localStorage.removeItem(USER_TOKEN_LOCALSTORAGE_KEY);
            localStorage.removeItem(USER_REFRESH_TOKEN_LOCALSTORAGE_KEY);
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(getUserInfo.pending, (state)=>{
        //     state.error = '';
        //     state.isLoading = true;
        // });
        // builder.addCase(getUserInfo.rejected, (state, action)=>{
        //     state.error = action.payload ?? 'request_error';
        //     state.isLoading = false;
        // });
        // builder.addCase(getUserInfo.fulfilled, (state, action) => {
        //     state.error = '';
        //     state.isLoading = false;
        // });
    }
});

export const {
    actions: userActions,
    reducer: userReducer,
    useActions: useUserActions
} = userSlice;
