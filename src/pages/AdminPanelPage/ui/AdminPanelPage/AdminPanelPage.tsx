import cls from './AdminPanelPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import { Page } from '@/widgets/Page';
import { AdminPanelBar } from '../AdminPanelBar/AdminPanelBar';
import { AdminPanelContentMode } from '../../model/type/adminPanel';
import { VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { adminPanelDataReducer } from '../../model/slice/adminPanelSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUsersForAdminPanel } from '@/features/getAdminPanelData';
import { AdminPanelLayout } from '../AdminPanelLayout/AdminPanelLayout';

interface AdminPanelPageProps {
    className?: string
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [contentMode, setContentMode] = useState<AdminPanelContentMode>(AdminPanelContentMode.USERS);
    const reducers: ReducerList = {
        adminPanel: adminPanelDataReducer
    };

    useEffect(()=>{
        dispatch(getUsersForAdminPanel(null));
    },[dispatch]);


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <VStack className={cls.layout}>
                <AdminPanelBar contentMode={contentMode} onToggle={setContentMode}/>
                <Page data-testid={'AdminPanelPage'} className={classNames('', {}, [className])}>
                    <VStack max={true} gap={'8px'} align={'start'} className={cls.AdminPanelPage}>
                        <AdminPanelLayout content={contentMode}/>
                    </VStack>
                </Page>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(AdminPanelPage);
