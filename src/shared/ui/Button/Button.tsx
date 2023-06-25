import cls from './Button.module.scss'
import { classNames, type Mods } from "@/shared/lib/classNames/classNames";
import { memo, type ReactNode, type ButtonHTMLAttributes } from 'react';


export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
    square?: boolean
    size?: ButtonSize
    disabled?: boolean
    children: ReactNode
    flex?: boolean
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        onClick,
        theme = '',
        square,
        disabled,
        flex,
        size = ButtonSize.M,
        ...otherProps
    } = props

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
        [cls.btnFlex]: flex
    }

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className])}
            onClick={onClick}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button'
