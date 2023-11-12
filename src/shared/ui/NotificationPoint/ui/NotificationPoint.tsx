import cls from './NotificationPoint.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';

export enum NotificationTheme {
    CLEAR = 'clear',
    OUTLINE= 'outline',
    BACKGROUND = 'background',
}

export enum NotificationSize {
    SIZE_S = 'size_s',
    SIZE_M = 'size_m',
    SIZE_L = 'size_l',
    SIZE_XL = 'size_xl',
}

export  enum NotificationColor {
    DEFAULT = 'default',
    RED = 'red',
    GREEN = 'green',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    BLUE = 'blue',
    DEEP_BLUE = 'deep_blue',
}

interface NotificationPointProps {
    className?: string
    children: ReactNode
    notificationText?: string
    theme?: NotificationTheme
    size?: NotificationSize
    color?: NotificationColor
    rounded?: boolean
    left?: string
    right?: string
    top?: string
    bottom?: string
}

export const NotificationPoint = memo((props: NotificationPointProps) => {
    const {
        className,
        children,
        notificationText,
        theme = NotificationTheme.OUTLINE,
        size = NotificationSize.SIZE_S,
        color = NotificationColor.DEFAULT,
        rounded,
        top,
        left,
        right,
        bottom,
        ...restProps
    } = props;

    const mods = {
        [cls[theme]]: true,
        [cls.rounded]: rounded,
        [cls[size]]: true,
        [cls[color]]: true,
    };

    console.log(classNames(cls.notification, mods, [className]));

    if (!notificationText) {
        return (
            <div>
                { children }
            </div>
        );
    }

    return (
        <div className={cls.NotificationPoint}>
            {children}
            <div
                className={classNames(cls.notification, mods, [className])}
                style={
                    {
                        'top':Number(top),
                        'bottom': Number(bottom),
                        'left': Number(left),
                        'right': Number(right),
                    }
                }

                {...restProps}
            >
                {notificationText}
            </div>
        </div>
    );
});

NotificationPoint.displayName = 'NotificationPoint';