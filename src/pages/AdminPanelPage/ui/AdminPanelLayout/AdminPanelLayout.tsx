import cls from './AdminPanelLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { AdminPanelUserTable } from '../AdminPanelUserTable/AdminPanelUserTable';
import { AdminPanelView } from '@/shared/const/adminPanelConsts';
import { MaintenanceTable } from '../MaintenanceTable/MaintenanceTable';



interface AdminPanelLayoutProps {
    className?: string
    currenView?: AdminPanelView
}

export const AdminPanelLayout = memo((props: AdminPanelLayoutProps) => {
    const { className, currenView } = props;


    if (currenView === AdminPanelView.USERS){
        return (<AdminPanelUserTable/>);
    }
    if (currenView === AdminPanelView.MAINTENANCE){
        return (<MaintenanceTable/>);
    }

    return (
        <div className={classNames(cls.AdminPanelLayout, {}, [className])}>

        </div>
    );
});

AdminPanelLayout.displayName = 'AdminPanelLayout';