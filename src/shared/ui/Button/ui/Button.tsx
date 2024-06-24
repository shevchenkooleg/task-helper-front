import { classNames,Mods } from '@/shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE= 'outline',
    OUTLINE_RED= 'outline_red',
    OUTLINE_GREEN= 'outline_green',
    BACKGROUND = 'background',
    BACKGROUND_GREEN = 'background_green',
}

export enum ButtonSize {
    SIZE_XS = 'size_xs',
    SIZE_S = 'size_s',
    SIZE_M = 'size_m',
    SIZE_L = 'size_l',
    SIZE_XL = 'size_xl',
}

export enum ButtonColor {
    SECONDARY_COLOR = 'secondary_color'
}


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    disabled?: boolean
    children: ReactNode
    theme?: ButtonTheme
    size?: ButtonSize
    flex?: boolean
    square?: boolean
    rounded?: boolean
    inverted?: boolean
    active?: boolean
    trimPadding?: boolean
    color?: ButtonColor
}

export const Button = memo((props: ButtonProps) => {

    const {
        className,
        square,
        disabled,
        children,
        size = ButtonSize.SIZE_M,
        theme = ButtonTheme.OUTLINE,
        flex,
        onClick,
        rounded,
        inverted,
        active,
        trimPadding = false,
        color = '',
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls.rounded]: rounded,
        [cls[size]]: true,
        [cls.disabled]: disabled,
        [cls.flex]: flex,
        [cls.inverted]: inverted,
        [cls.active]:active,
        [cls.trimPadding]: trimPadding,
        [cls[color]]:color
    };

    return (
        <button
            disabled={disabled}
            type='button'
            className={classNames(cls.Button, mods, [className])}
            onClick={onClick}
            {...otherProps}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';