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

interface MaintenanceUnitInformationProps {
    className?: string
    setModalOpen?: (isOpen: boolean) => void
}

export const MaintenanceUnitInformation = memo((props: MaintenanceUnitInformationProps) => {
    const { className , setModalOpen } = props;
    const formData = useSelector(getUnitDetailsFormData) as EquipmentInterface;
    formData && console.log('formData ', formData.scheduledMaintenanceList);

    const onAddBtnClickHandler = useCallback(()=>{
        setModalOpen && setModalOpen(true);
    },[setModalOpen]);

    return (
        <VStack max className={classNames(cls.MaintenanceUnitInformation, {}, [className])}>
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
            {formData.scheduledMaintenanceList ? <TableGrid items={formData.scheduledMaintenanceList}/> : <Text text={'ТО не назначено'}/>}
        </VStack>
    );
});

MaintenanceUnitInformation.displayName = 'MaintenanceUnitInformation';