import { type UserRole } from "../consts/consts";

export interface User {
    id: number | undefined
    username: string | undefined
    avatar?: string
    roles?: UserRole[]
}

export interface UserSchema {
    authData?: User
    _isInit: boolean
}
