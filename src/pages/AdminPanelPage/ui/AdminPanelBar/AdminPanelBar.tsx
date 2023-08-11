import cls from './AdminPanelBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { AdminPanelContentMode } from '../../model/type/adminPanel';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUsersForAdminPanel } from '@/features/getAdminPanelData';

interface AdminPanelBarProps {
    className?: string
    onToggle: (newValue: AdminPanelContentMode) => void
    contentMode: AdminPanelContentMode
}

export const AdminPanelBar = memo((props: AdminPanelBarProps) => {
    const { className, onToggle, contentMode } = props;
    const dispatch = useAppDispatch();

    const onUsersButtonClick = () => {
        onToggle(AdminPanelContentMode.USERS);

        dispatch(getUsersForAdminPanel(null));
    };

    return (
        <HStack className={classNames(cls.AdminPanelBar, {}, [className])}>
            <Button
                active={contentMode === AdminPanelContentMode.USERS}
                onClick={onUsersButtonClick}
            >
                Пользователи
            </Button>
            <Button
                active={contentMode === AdminPanelContentMode.ORDERS}
                onClick={()=>{onToggle(AdminPanelContentMode.ORDERS);}}
            >
                Карточки заказов
            </Button>
        </HStack>
    );
});

AdminPanelBar.displayName = 'AdminPanelBar';