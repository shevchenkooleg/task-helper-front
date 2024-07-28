import cls from './MaintenanceUnitInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { useSelector } from 'react-redux';
import { getUnitDetailsFormData } from '../../model/selectors/getUnitDetailsFormData/getUnitDetailsFormData';
import { EquipmentInterface } from '../../model/types/unitDetailsTypes';
import { TableGrid } from '@/shared/ui/TableGrid';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { maintenanceTabTitlesMapper } from '@/shared/lib/titleMappers/maintenanceTitleMapper';
import {
    getUnitDetailsMaintenanceDictionary
} from '../../model/selectors/getUnitDetailsMaintenanceDictionary/getUnitDetailsMaintenanceDictionary';
import { maintenancePeriodicityMapper } from '@/shared/const/maintenanceConsts';
import { expandUnitDetailsData } from '@/shared/lib/expandUnitDetailsData/expandUnitDetailsData';

interface MaintenanceUnitInformationProps {
    className?: string
    setModalOpen?: (isOpen: boolean) => void
}

const tabKeys = [
    'fullName',
    'shortName',
    'replaceableMaintenance',
    'periodicity',
];

export const MaintenanceUnitInformation = memo((props: MaintenanceUnitInformationProps) => {
    const { className , setModalOpen } = props;
    const formData = useSelector(getUnitDetailsFormData) as EquipmentInterface;
    const possibleMaintenance = useSelector(getUnitDetailsMaintenanceDictionary);

    const onAddBtnClickHandler = useCallback(()=>{
        setModalOpen && setModalOpen(true);
    },[setModalOpen]);

    const scheduledMaintenanceListForRendering = expandUnitDetailsData(formData.scheduledMaintenanceList!, possibleMaintenance!);

    return (
        <VStack gap={'8px'} max className={classNames(cls.MaintenanceUnitInformation, {}, [className])}>
            <Text text={'Виды периодического ТО'}/>
            <Button
                theme={ButtonTheme.BACKGROUND_GREEN} 
                trimPadding rounded
                size={ButtonSize.SIZE_S}
                className={cls.addMaintenanceButton}
                onClick={onAddBtnClickHandler}
            >
                Добавить ТО
            </Button>
            {scheduledMaintenanceListForRendering.length
                ? <TableGrid
                    items={scheduledMaintenanceListForRendering}
                    template={'structurePageMaintenanceTemplate'}
                    tabKeys={tabKeys}
                    headerKeysMapper={maintenanceTabTitlesMapper}
                    helpMappers={maintenancePeriodicityMapper}
                />
                : <Text text={'ТО не назначено'}/>}
        </VStack>
    );
});

MaintenanceUnitInformation.displayName = 'MaintenanceUnitInformation';