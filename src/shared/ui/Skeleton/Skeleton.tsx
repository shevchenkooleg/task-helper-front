import cls from './Skeleton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { type CSSProperties, memo } from 'react';

interface SkeletonProps {
    className?: string
    height?: string | number
    width?: string | number
    border?: string
    max?: boolean
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        height,
        width,
        border,
        max,
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border
    };

    max ? styles.width = '100%' : styles.width;

    console.log('styles ', styles);

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        />
    );
});

Skeleton.displayName = 'Skeleton';
