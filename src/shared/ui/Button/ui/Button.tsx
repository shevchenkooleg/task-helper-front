import { classNames,Mods } from '@/shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE= 'outline',
    BACKGROUND = 'background',
}

export enum ButtonSize {
    SIZE_S = 'size_s',
    SIZE_M = 'size_m',
    SIZE_L = 'size_l',
    SIZE_XL = 'size_xl',
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
        [cls.active]:active
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