import { useSelector } from 'react-redux';
import { getUserAuthData, getUserRoles, type UserRole } from '@/entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { getRouteForbiddenPage, getRouteMain } from '@/shared/const/router';

interface RequireAuthProps {
    children: JSX.Element
    roles?: UserRole[]
}

export function RequireAuth ({ children, roles }: RequireAuthProps) {
    const user_id = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const harRequireRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some(requiredRole => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    
    if (!user_id) {
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    if (!harRequireRoles) {
        return <Navigate to={getRouteForbiddenPage()} state={{ from: location }} replace />;
    }

    return children;
}
