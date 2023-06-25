import { Button } from "@/shared/ui/Button";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";


// for test purposes only
export const BugButton = () => {
    const { t } = useTranslation()


    const [error, setError] = useState(false)

    useEffect(() => {
        if (error) {
            throw new Error()
        }
    }, [error])

    const onThrowError = () => {
        setError(true)
    }

    return (
        <div>
            <Button onClick={onThrowError}>{t('Выкинуть ошибку')}</Button>
        </div>
    );
};
