import cls from './Card.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline',
    INVERTED = 'inverted'
}

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    className?: string
    children: ReactNode
    theme?: CardTheme
    max?: boolean
}

export const Card = memo((props: CardProps) => {
    const { className, children, theme = CardTheme.NORMAL, max, ...otherProps } = props;
    const mods: Mods = {
        [cls[theme]]: theme,
        [cls.max]: max
    };

    return (
        <div className={classNames(cls.Card, mods, [className])} {...otherProps}>
            {children}
        </div>
    );
});

Card.displayName = 'Card';