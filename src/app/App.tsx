import { getUserIsInit } from '@/entities/User';
import { getUserInfo } from '@/features/authByUsername';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/router';

const App = () => {

    const { theme } = useTheme();
    const isInit = useSelector(getUserIsInit);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserInfo(null));
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback=''>
                <Navbar/>
                <div className="content-page">
                    <Sidebar/>
                    {isInit && <AppRouter/>}
                </div>
            </Suspense>
        </div>

    );
};

export default App;