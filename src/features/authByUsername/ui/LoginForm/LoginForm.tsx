import cls from './LoginForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { memo, useCallback, useEffect } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from '@/shared/ui/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, type ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { type StateSchema } from '@/app/providers/StoreProvider';
import { type LoginSchema } from '../../model/types/loginSchema';

export interface LoginFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: ReducerList = {
    loginForm: loginReducer
};


const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const dispatch = useAppDispatch();
    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, username, password, onSuccess]);
    const onEnterKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onLoginClick();
        }
    }, [onLoginClick]);

    useEffect(() => {
        window.addEventListener('keydown', onEnterKeyPress);
        return () => { window.removeEventListener('keydown', onEnterKeyPress); };
    }, [onEnterKeyPress]);


    const login: LoginSchema | undefined = useSelector((state: StateSchema) => state?.loginForm);

    useEffect(() => {
        console.log(login);
    }, [login]);

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={'Форма авторизации'}/>
                {error && <Text text={'Неверный логин и/или пароль'} theme={TextTheme.ERROR}/>}
                <div className={cls.wrapper}>
                    <Input
                        placeholder={`${'Введите логин'}`}
                        className={cls.input}
                        onChange={onChangeUsername}
                        value={username}
                    />
                    <Input
                        placeholder={`${'Введите пароль'}`}
                        className={cls.input}
                        onChange={onChangePassword}
                        value={password}
                    />
                    <Button
                        onClick={onLoginClick}
                        theme={ButtonTheme.OUTLINE}
                        className={cls.loginBtn}
                        disabled={isLoading}
                    >
                        {'Войти'}
                    </Button>
                </div>
            </div>
        </DynamicModuleLoader>
    );
});


LoginForm.displayName = 'LoginForm';


export default LoginForm;
