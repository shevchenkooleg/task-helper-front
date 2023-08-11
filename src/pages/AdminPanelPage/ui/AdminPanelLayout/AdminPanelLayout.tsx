import cls from './AdminPanelLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { AdminPanelContentMode } from '../../model/type/adminPanel';
import { AdminPanelUserTable } from '../AdminPanelUserTable/AdminPanelUserTable';



interface AdminPanelLayoutProps {
    className?: string
    content: AdminPanelContentMode
}

export const AdminPanelLayout = memo((props: AdminPanelLayoutProps) => {
    const { className, content } = props;


    if (content === AdminPanelContentMode.USERS){
        return (<AdminPanelUserTable/>);
    }
    return (
        <div className={classNames(cls.AdminPanelLayout, {}, [className])}>

        </div>
    );
});

AdminPanelLayout.displayName = 'AdminPanelLayout';