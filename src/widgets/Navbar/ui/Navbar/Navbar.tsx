import cls from './Navbar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Text } from '@/shared/ui/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/authByUsername';
import { HStack } from '@/shared/ui/Stack';
import { getTokenAuthData } from '@/entities/User';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NavbarToolsPanel } from '../NavbarToolsPanel/NavbarToolsPanel';

interface NavbarProps {
    className?: string
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;
    const [isAuthModal, setIsAuthModal] = useState(false);
    const accessToken = useSelector(getTokenAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);



    if (accessToken){
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.appName} title={'Планировщик материалов ТОРО'} inverted={false}/>
                <HStack className={cls.actions}>
                    <NavbarToolsPanel/>
                    <AvatarDropdown/>
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