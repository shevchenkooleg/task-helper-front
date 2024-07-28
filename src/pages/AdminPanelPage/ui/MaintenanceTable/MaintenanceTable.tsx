import cls from './MaintenanceTable.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useEffect, useState } from 'react';
import {
    getMaintenanceForAdminPanel
} from '@/features/getAdminPanelData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TableGrid } from '@/shared/ui/TableGrid';
import { useSelector } from 'react-redux';
import {
    getMaintenanceForAdminPanelSelector
} from '../../model/selectors/getMaintenanceForAdminPanelSelector/getMaintenanceForAdminPanelSelector';
import { AdminPanelMaintenanceItem } from '@/entities/Maintenance';
import { AddNewMaintenanceModal } from '@/features/addNewMaintenance';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { maintenanceTabTitlesMapper } from '@/shared/lib/titleMappers/maintenanceTitleMapper';
import { maintenancePeriodicityMapper } from '@/shared/const/maintenanceConsts';

interface MaintenanceTableProps {
    className?: string
}

export const MaintenanceTable = memo((props: MaintenanceTableProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const maintenance = useSelector(getMaintenanceForAdminPanelSelector);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getMaintenanceForAdminPanel(null));
    }, [dispatch]);

    const onModalClose = () => {
        console.log('modal close');
        setIsModalOpen(false);
    };

    const tabKeys = [
        '_id',
        'fullName',
        'shortName',
        // 'replaceableMaintenance',
        // 'periodicity',
    ];

    const MaintenanceTable = ()=>{
        if (maintenance?.length){
            return (
                <TableGrid<AdminPanelMaintenanceItem, null, null>
                    items={maintenance}
                    tabKeys={tabKeys}
                    callback={()=>{
                        console.log('qqq');}}
                    template={'adminPanelMaintenanceTemplate'}
                    headerKeysMapper={maintenanceTabTitlesMapper}
                    helpMappers={maintenancePeriodicityMapper}
                />
            );
        }
        return null;
    };

    return (
        <VStack gap={'16px'} align={'start'} className={classNames(cls.MaintenanceTable, {}, [className])}>
            <Button
                theme={ButtonTheme.BACKGROUND_GREEN}
                size={ButtonSize.SIZE_S}
                rounded={true}
                onClick={()=>{setIsModalOpen(true);}}
            >
                Добавить ТО
            </Button>
            <MaintenanceTable/>
            {isModalOpen && <AddNewMaintenanceModal isOpen={isModalOpen} onClose={onModalClose}/>}
        </VStack>
    );
});

MaintenanceTable.displayName = 'MaintenanceTable';