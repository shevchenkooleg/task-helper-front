import cls from './Flex.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';



export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexGap = '4px' | '8px' | '16px' | '32px'
export type FlexDirection = 'row' | 'column'

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center:cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
    around: cls.justifyAround,
};

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const gapClasses: Record<FlexGap, string> = {
    '4px': cls.gap4,
    '8px': cls.gap8,
    '16px': cls.gap16,
    '32px': cls.gap32,
};

const directionClasses: Record<FlexDirection, string> = {
    column: cls.directionColumn,
    row: cls.directionRow,
};

type divProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends divProps {
    className?: string
    children: ReactNode
    align?: FlexAlign
    justify?: FlexJustify
    gap?: FlexGap
    direction?: FlexDirection,
    max?: boolean
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        direction = 'row',
        justify = 'start',
        align = 'center',
        gap,
        max
    } = props;

    const additionalClasses = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    const mods = {
        [cls.max]: max
    };

    return (
        <div className={classNames(cls.Flex, mods, additionalClasses)}>
            {children}
        </div>
    );
};