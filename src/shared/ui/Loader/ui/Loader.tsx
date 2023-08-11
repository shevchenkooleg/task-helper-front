import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import LoaderSVG from '../../../assets/icons/Spinner-1s-200px.svg';
import cls from './Loader.module.scss';

interface LoaderProps {
    className?: string
}

export const Loader = memo((props: LoaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Loader, {}, [className])}>
            <LoaderSVG/>
        </div>
    );
});

Loader.displayName = 'Loader';