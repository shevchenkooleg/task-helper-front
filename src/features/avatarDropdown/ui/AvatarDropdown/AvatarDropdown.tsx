import cls from './AvatarDropdown.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Dropdown } from '@/shared/ui/Popups';
import { Text } from '@/shared/ui/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { getUserCredential, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRouteUserProfile } from '@/shared/const/router';

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const userCredentials = useSelector(getUserCredential);

    console.log(userCredentials);


    const logOut = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const dropDownItems = [
        {
            content: <Button theme={ButtonTheme.CLEAR}>{'Профиль'}</Button>,
            onClick: ()=>{},
            href: getRouteUserProfile()
        },
        {
            content: <Button theme={ButtonTheme.CLEAR}>{'Выйти'}</Button>,
            onClick: logOut,
            href: '/'
        }
    ];

    return (
        <div className={classNames(cls.AvatarDropdown, {}, [className])}>
            <Dropdown
                items={dropDownItems}
                direction={'bottom left'}
                trigger={userCredentials?.firstName
                    ? <Text text={`${userCredentials?.lastName} ${userCredentials?.firstName}`}/>
                    : 'Имя пользователя'
                }
            />

        </div>
    );
});

AvatarDropdown.displayName = 'AvatarDropdown';