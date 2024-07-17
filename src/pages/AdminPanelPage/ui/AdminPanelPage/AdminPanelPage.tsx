import cls from './AdminPanelPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import { Page } from '@/widgets/Page';
import { AdminPanelPageToolPanel } from '../AdminPanelToolPanel/AdminPanelPageToolPanel';
import { AdminPanelContentMode } from '../../model/type/adminPanel';
import { HStack, VStack } from '@/shared/ui/Stack';
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
            <HStack className={cls.layout}>
                <AdminPanelPageToolPanel
                    contentMode={contentMode}
                    //onToggle={setContentMode}
                />
                <Page data-testid={'AdminPanelPage'} className={classNames('', {}, [className])}>
                    <VStack max={true} gap={'8px'} align={'start'} className={cls.AdminPanelPage}>
                        <AdminPanelLayout contentMode={contentMode}/>
                    </VStack>
                </Page>
            </HStack>
        </DynamicModuleLoader>
    );
};

export default memo(AdminPanelPage);
