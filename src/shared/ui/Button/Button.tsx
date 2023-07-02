import { classNames,Mods } from '@/shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE= 'outline',
    ROUNDED = 'rounded',
    SQUARE = 'square'
}

export enum ButtonSize {
    SIZE_S = 'size-s',
    SIZE_M = 'size-m',
    SIZE_L = 'size-l',
    SIZE_XL = 'size-xl',

}


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    disabled?: boolean
    children: ReactNode
    theme?: ButtonTheme
    size?: ButtonSize
    flex?: boolean
    square?: boolean
}

export const Button = memo((props: ButtonProps) => {

    const {
        className,
        square,
        disabled,
        children,
        size,
        theme = ButtonTheme.OUTLINE,
        flex,
        onClick,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls.size_s]: true
    };

    return (
        <button
            disabled={disabled}
            type='button'
            className={classNames(cls.Button, mods, [className])}
            {...otherProps}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';