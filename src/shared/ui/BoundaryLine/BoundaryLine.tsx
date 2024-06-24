import cls from './BoundaryLine.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

export enum BoundaryLineColor {
    BLACK = 'color_black'
}

interface BoundaryLineProps {
    className?: string
    max?: boolean
    color?: BoundaryLineColor
}

export const BoundaryLine = memo((props: BoundaryLineProps) => {
    const { className, max = false, color = '' } = props;

    const mods = {
        [cls.max]: max,
        [cls[color]]: color
    };

    return (
        <div className={classNames(cls.BoundaryLine, mods, [className])}/>
    );
});

BoundaryLine.displayName = 'BoundaryLine';