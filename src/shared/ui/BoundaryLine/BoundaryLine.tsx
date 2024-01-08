import cls from './BoundaryLine.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

interface BoundaryLineProps {
    className?: string
    max?: boolean
}

export const BoundaryLine = memo((props: BoundaryLineProps) => {
    const { className, max = false } = props;

    const mods = {
        [cls.max]: max
    };

    return (
        <div className={classNames(cls.BoundaryLine, mods, [className])}/>
    );
});

BoundaryLine.displayName = 'BoundaryLine';