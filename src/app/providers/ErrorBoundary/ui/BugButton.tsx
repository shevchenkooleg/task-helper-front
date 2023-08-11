import { Button } from '@/shared/ui/Button';
import React, { useEffect, useState } from 'react';


// for test purposes only
export const BugButton = () => {


    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    const onThrowError = () => {
        setError(true);
    };

    return (
        <div>
            <Button onClick={onThrowError}>{'Выкинуть ошибку'}</Button>
        </div>
    );
};
