import cls from './PageError.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { type FC } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button } from '../../Button';


interface ErrorPageProps {
    className?: string
}

export const PageError: FC<ErrorPageProps> = (props) => {
    const { className } = props;
    const { theme } = useTheme();

    const reloadPage = () => {
        location.reload();
    };


    return (
        <div className={classNames(cls.ErrorPage, {}, [className, theme])}>
            <p>{'Произошла непредвиденная ошибка'}</p>
            <Button onClick={reloadPage}>{'Обновить страницу'}</Button>
        </div>
    );
};
