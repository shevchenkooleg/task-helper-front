import cls from './BoundaryLine.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

interface BoundaryLineProps {
    className?: string
}

export const BoundaryLine = memo((props: BoundaryLineProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.BoundaryLine, {}, [className])}/>
    );
});

BoundaryLine.displayName = 'BoundaryLine';