import { type UserRole } from '../../../../shared/const/userConsts';

export interface User {
    user_id: string | undefined
    name: string | undefined
    avatar?: string
    roles?: UserRole[]
}

export interface TokenResponseInterface {
    access_token?: string
    expires_in?: number
    refresh_token?: string
    token_type?: string
}

export interface UserInfoResponseInterface {
    name: string
    user_id: string
    scope?: string
    roles?: UserRole[]
}

export interface UserSchema {
    tokenAuthData?: TokenResponseInterface
    userData?: User
    _isInit: boolean
    error: string
    isLoading: boolean
}