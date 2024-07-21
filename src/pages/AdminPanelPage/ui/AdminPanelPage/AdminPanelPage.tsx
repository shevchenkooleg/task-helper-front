import cls from './AdminPanelPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useEffect } from 'react';
import { Page } from '@/widgets/Page';
import { AdminPanelPageToolPanel } from '../AdminPanelToolPanel/AdminPanelPageToolPanel';
import { HStack, VStack } from '@/shared/ui/Stack';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { adminPanelDataReducer } from '../../model/slice/adminPanelSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUsersForAdminPanel } from '@/features/getAdminPanelData';
import { AdminPanelLayout } from '../AdminPanelLayout/AdminPanelLayout';
import { useSelector } from 'react-redux';
import { getAdminPanelView } from '../..';

interface AdminPanelPageProps {
    className?: string
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const reducers: ReducerList = {
        adminPanel: adminPanelDataReducer
    };

    const currenView = useSelector(getAdminPanelView);

    useEffect(()=>{
        dispatch(getUsersForAdminPanel(null));
    },[dispatch]);


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <HStack className={cls.layout}>
                <AdminPanelPageToolPanel currenView={currenView}/>
                <Page data-testid={'AdminPanelPage'} className={classNames('', {}, [className])}>
                    <VStack max={true} gap={'8px'} align={'start'} className={cls.AdminPanelPage}>
                        <AdminPanelLayout currenView={currenView}/>
                    </VStack>
                </Page>
            </HStack>
        </DynamicModuleLoader>
    );
};

export default memo(AdminPanelPage);
