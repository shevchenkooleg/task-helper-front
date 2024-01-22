import cls from './Flex.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';



export type FlexJustify = 'start' | 'end' | 'center' | 'between' | 'around'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexGap = '4px' | '8px' | '12px' | '16px' | '20px' | '24px' | '28px' | '32px'
export type FlexDirection = 'row' | 'column'
export type FlexWrap = 'wrap' | 'nowrap'

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

const wrapClasses: Record<FlexWrap, string> = {
    wrap: cls.wrap,
    nowrap: cls.noWrap
};

const gapClasses: Record<FlexGap, string> = {
    '4px': cls.gap4,
    '8px': cls.gap8,
    '12px': cls.gap12,
    '16px': cls.gap16,
    '20px': cls.gap20,
    '24px': cls.gap24,
    '28px': cls.gap28,
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
    wrap?: FlexWrap
    direction?: FlexDirection,
    max?: boolean
    width?: string
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        direction = 'row',
        justify = 'start',
        align = 'center',
        wrap = 'nowrap',
        gap,
        max,
        width
    } = props;

    console.log(wrap);

    const additionalClasses = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
        wrapClasses[wrap]
    ];

    const mods = {
        [cls.max]: max
    };

    return (
        <div className={classNames(cls.Flex, mods, additionalClasses)} style={width ? { width:width } : {}}>
            {children}
        </div>
    );
};