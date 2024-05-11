import { getTokenAuthData, getUserIsInit, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { getUserInfo } from '@/features/authByUsername';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';
import { Navbar } from '@/widgets/Navbar';

const App = () => {

    const { theme } = useTheme();
    const isInit = useSelector(getUserIsInit);
    const dispatch = useAppDispatch();
    //const user_token = localStorage.getItem(USER_TOKEN_LOCALSTORAGE_KEY);
    const user_token = useSelector(getTokenAuthData);

    useEffect(() => {
        dispatch(userActions.initAuthData());
        console.log('dispatch(userActions.initAuthData())');
        dispatch({ type: 'flagInitGetUserInfo' });
    }, [dispatch]);

    useEffect(() => {
        user_token && console.log('user_token_in_useEffect', user_token);
        user_token && console.log('dispatch(getUserInfo(user_token)');
        user_token && dispatch(getUserInfo(user_token));
    }, [dispatch, user_token]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback={<PageLoader/>}>
                <Sidebar/>

                <div className="content-page">
                    <Navbar/>
                    {isInit && <AppRouter/>}
                </div>
            </Suspense>
        </div>

    );
};

export default App;