// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { UserRole } from '@/entities/User';
import { type RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}