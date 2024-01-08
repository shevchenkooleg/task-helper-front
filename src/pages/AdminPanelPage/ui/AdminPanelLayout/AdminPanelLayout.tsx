import cls from './AdminPanelLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { AdminPanelContentMode } from '../../model/type/adminPanel';
import { AdminPanelUserTable } from '../AdminPanelUserTable/AdminPanelUserTable';



interface AdminPanelLayoutProps {
    className?: string
    contentMode: AdminPanelContentMode
}

export const AdminPanelLayout = memo((props: AdminPanelLayoutProps) => {
    const { className, contentMode } = props;


    if (contentMode === AdminPanelContentMode.USERS){
        return (<AdminPanelUserTable/>);
    }
    return (
        <div className={classNames(cls.AdminPanelLayout, {}, [className])}>

        </div>
    );
});

AdminPanelLayout.displayName = 'AdminPanelLayout';