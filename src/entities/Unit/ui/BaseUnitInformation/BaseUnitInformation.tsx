import cls from './BaseUnitInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { UnitTypeSelect } from '../UnitTypeSelect/UnitTypeSelect';
import { ButtonSize } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { getUnitDetailsFormData } from '../../model/selectors/getUnitDetailsFormData/getUnitDetailsFormData';
import { EquipmentInterface } from '../../model/types/unitDetailsTypes';

interface BaseUnitInformationProps {
    className?: string
}

export const BaseUnitInformation = memo((props: BaseUnitInformationProps) => {
    const { className } = props;

    const unitFormData = useSelector(getUnitDetailsFormData) as EquipmentInterface;

    return (
        <VStack gap={'12px'} max className={classNames(cls.BaseUnitInformation, {}, [className])} align={'start'}>
            <HStack gap={'8px'} max>
                <Text text={'Наименование объекта: '} className={cls.title}/>
                <Input value={unitFormData?.unitName} width={'400'}/>
            </HStack>
            <HStack gap={'8px'} max >
                <Text text={'Тип объекта: '} className={cls.title}/>
                <UnitTypeSelect
                    size={ButtonSize.SIZE_S}
                    value={unitFormData?.unitType}
                    className={cls.typeSelect}
                    width={'250'}
                />
            </HStack>
            <HStack gap={'8px'} max>
                <Text text={'Код KKS: '} className={cls.title}/>
                <Input value={unitFormData?.toroKKS}/>
            </HStack>
            <HStack gap={'8px'} max>
                <Text text={'Код в системе ТОРО: '} className={cls.title}/>
                <Input value={unitFormData?.toroKKS}/>
            </HStack>
            <HStack gap={'8px'} max>
                <Text text={'Модель объекта: '} className={cls.title}/>
                <Input value={unitFormData?.toroKKS}/>
            </HStack>
            <HStack gap={'8px'} max>
                <Text text={'Планируемая дата ТО: '} className={cls.title}/>
                <Input type={'date'} value={unitFormData?.toroKKS}/>
            </HStack>
        </VStack>
    );
});

BaseUnitInformation.displayName = 'BaseUnitInformation';