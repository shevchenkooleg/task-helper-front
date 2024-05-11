import cls from './UserProfilePage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';

interface UserProfilePageProps {
    className?: string
}

export const UserProfilePage = memo((props: UserProfilePageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.UserProfilePage, {}, [className])}>
            UserProfilePage
        </div>
    );
});

UserProfilePage.displayName = 'UserProfilePage';