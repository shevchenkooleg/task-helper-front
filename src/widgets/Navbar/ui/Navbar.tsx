import cls from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Text } from '@/shared/ui/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { userActions } from '@/entities/User';
import { LoginModal } from '@/features/authByUsername';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getTokenAuthData } from '@/entities/User';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
    className?: string
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const [isAuthModal, setIsAuthModal] = useState(false);
    const accessToken = useSelector(getTokenAuthData);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        console.log('open');
        setIsAuthModal(true);
    }, []);

    const logOut = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (accessToken){
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.appName} title={'TORO_MRP_APP'} inverted={true}/>
                <HStack className={cls.actions}>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        inverted={true}
                        onClick={logOut}
                    >
                        Выйти
                    </Button>
                </HStack>

            </header>
        );
    } else {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <div className={classNames(cls.links)}>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        inverted={true}
                        onClick={onShowModal}
                    >
                        {'Войти'}
                    </Button>
                </div>
                {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal}/>}
            </header>
        );
    }
});

Navbar.displayName = 'Navbar';