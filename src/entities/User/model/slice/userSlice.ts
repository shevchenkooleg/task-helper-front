import { type PayloadAction } from '@reduxjs/toolkit'
import { type User, type UserSchema } from "../types/user";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { buildSlice } from "@/shared/lib/store";

const initialState: UserSchema = {
    _isInit: false
}
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
export const userSlice = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
            if (user) {
                state.authData = JSON.parse(user)
            }
            state._isInit = true
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    actions: userActions,
    reducer: userReducer,
    useActions: useUserActions
} = userSlice
