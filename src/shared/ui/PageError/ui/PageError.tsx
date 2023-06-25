import cls from "./PageError.module.scss"
import { classNames } from "@/shared/lib/classNames/classNames";
import React, { type FC } from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "../../Button/Button";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";


interface ErrorPageProps {
    className?: string
}

export const PageError: FC<ErrorPageProps> = (props) => {
    const { className } = props
    const { t } = useTranslation()
    const { theme } = useTheme()

    const reloadPage = () => {
        location.reload()
    }


    return (
        <div className={classNames(cls.ErrorPage, {}, [className, theme])}>
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
        </div>
    );
};
