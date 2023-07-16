import { memo } from 'react';
import cls from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INVERTED = 'inverted'
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
}

export const AppLink = memo((props: AppLinkProps) => {
    const { to, className, children, theme = AppLinkTheme.PRIMARY, ...restProps } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...restProps}
        >
            {children}
        </Link>
    );
});

AppLink.displayName = 'AppLink';