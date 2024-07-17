import cls from './UnitDataCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import { getUnitDetailsFormData } from '../../model/selectors/getUnitDetailsFormData/getUnitDetailsFormData';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { UnitTypeSelect } from '../UnitTypeSelect/UnitTypeSelect';
import { ButtonSize } from '@/shared/ui/Button';
import { EquipmentInterface } from '../../model/types/unitDetailsTypes';

interface UnitDataCardProps {
    className?: string
}

export const UnitDataCard = memo((props: UnitDataCardProps) => {
    const { className } = props;

    const unitFormData = useSelector(getUnitDetailsFormData) as EquipmentInterface;

    return (
        <VStack gap={'12px'} max className={classNames(cls.UnitDataCard, {}, [className])} align={'start'}>
            <HStack gap={'8px'} max>
                <Text text={'Наименование объекта: '} className={cls.title}/>
                <Input value={unitFormData?.unitName}/>
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

UnitDataCard.displayName = 'UnitDataCard';