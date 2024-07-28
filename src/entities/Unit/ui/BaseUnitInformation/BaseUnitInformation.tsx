import cls from './BaseUnitInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { UnitTypeSelect } from '../UnitTypeSelect/UnitTypeSelect';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { getUnitDetailsFormData } from '../../model/selectors/getUnitDetailsFormData/getUnitDetailsFormData';
import { EquipmentInterface } from '../../model/types/unitDetailsTypes';
import { getUnitDetailsData } from '../../model/selectors/getUnitDetailsData/getUnitDetailsData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UnitDetailsSliceActions } from '../../model/slice/unitDetailsSlice';
import { updateUnitById } from '../../model/services/updateUnitById';

interface BaseUnitInformationProps {
    className?: string
}

export const BaseUnitInformation = memo((props: BaseUnitInformationProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const unitData = useSelector(getUnitDetailsData) as EquipmentInterface;
    const unitFormData = useSelector(getUnitDetailsFormData) as EquipmentInterface;

    const isDifferent =
        unitData.unitName !== unitFormData.unitName ||
        unitData.toroKKS !== unitFormData.toroKKS ||
        unitData.unitKKS !== unitFormData.unitKKS;
    console.log('isDifferent ', isDifferent);

    const onSaveBtnClickHandler = useCallback(async ()=>{

        const updatedUnitForDispatch = {
            unitName: unitFormData.unitName ?? '',
            unitKKS: unitFormData.unitKKS ?? '',
            toroKKS: unitFormData.toroKKS ?? '',
        };

        console.log('updatedUnitForDispatch ', updatedUnitForDispatch);

        try {
            if (unitData._id) {
                await dispatch(updateUnitById({ unitId: unitData._id, updatedUnit: updatedUnitForDispatch }));
            }

        } catch (e) {
            console.log(e);
        }
    },[unitFormData]);

    const onCancelBtnClickHandler = useCallback(()=>{
        dispatch(UnitDetailsSliceActions.cancelUnitFormDataChanges());
    },[]);

    const onUnitNameChangeHandler = useCallback((newValue: string)=>{
        dispatch(UnitDetailsSliceActions.setUnitNameFormData(newValue));
    },[]);

    const onUnitKKSChangeHandler = useCallback((newValue: string)=>{
        dispatch(UnitDetailsSliceActions.setUnitKKSFormData(newValue));
    },[]);

    const onToroKKSChangeHandler = useCallback((newValue: string)=>{
        dispatch(UnitDetailsSliceActions.setToroKKSFormData(newValue));
    },[]);


    return (
        <VStack gap={'12px'} max className={classNames(cls.BaseUnitInformation, {}, [className])} align={'start'}>
            {
                isDifferent && <HStack className={cls.saveBtn} gap={'8px'}>
                    <Button
                        onClick={onSaveBtnClickHandler}
                        size={ButtonSize.SIZE_S}
                        theme={ButtonTheme.BACKGROUND_GREEN}
                        trimPadding
                        rounded
                    >
                    Сохранить
                    </Button>
                    <Button
                        onClick={onCancelBtnClickHandler}
                        size={ButtonSize.SIZE_S}
                        theme={ButtonTheme.BACKGROUND_RED}
                        trimPadding
                        rounded
                    >
                    Отменить
                    </Button>
                </HStack>
            }

            <HStack gap={'8px'} max>
                <Text text={'Наименование объекта: '} className={cls.title}/>
                <Input value={unitFormData?.unitName} width={'400'} onChange={onUnitNameChangeHandler}/>
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
                <Input value={unitFormData?.unitKKS ?? ''} onChange={onUnitKKSChangeHandler}/>
            </HStack>
            <HStack gap={'8px'} max>
                <Text text={'Код в системе ТОРО: '} className={cls.title}/>
                <Input value={unitFormData?.toroKKS ?? ''} onChange={onToroKKSChangeHandler}/>
            </HStack>
            <HStack gap={'8px'} max>
                <Text text={'Модель объекта: '} className={cls.title}/>
                {/*<Input value={unitFormData?.toroKKS}/>*/}
            </HStack>
            <HStack gap={'8px'} max>
                <Text text={'Планируемая дата ТО: '} className={cls.title}/>
                <Input type={'date'} value={unitFormData?.nextScheduledMaintenanceDate?.maintenanceDate ?? ''}/>
            </HStack>
        </VStack>
    );
});

BaseUnitInformation.displayName = 'BaseUnitInformation';