import cls from './MaterialCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { useSelector } from 'react-redux';
import { getMaterialDetailsEditMode } from '../../model/selectors/getMaterialDetailsEditMode/getMaterialDetailsEditMode';
import { Dimension, DimensionSelect } from '@/entities/Dimension';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { materialDetailsSliceActions } from '../../model/slice/materialDetailsSlice';
import { getMaterialFormData } from '../../model/selectors/getMaterialFormData/getMaterialFormData';





interface MaterialCardProps {
    className?: string
}

export const MaterialCard = memo((props: MaterialCardProps) => {
    const { className } = props;
    const materialForm = useSelector(getMaterialFormData);
    const editMode = useSelector(getMaterialDetailsEditMode);
    const dispatch = useAppDispatch();

    const onChangeMaterialName = useCallback((value?: string) => {
        dispatch(materialDetailsSliceActions.updateMaterialForm({
            materialName: value || ''
        }));
    }, [dispatch]);

    const onChangeMaterialKSUId = useCallback((value?: string) => {
        dispatch(materialDetailsSliceActions.updateMaterialForm({
            KSUId: value || ''
        }));
    }, [dispatch]);

    const onChangeMaterialUPPId = useCallback((value?: string) => {
        dispatch(materialDetailsSliceActions.updateMaterialForm({
            UPPId: value || ''
        }));
    }, [dispatch]);

    const onChangeMaterialFullVolume = useCallback((value?: string) => {
        dispatch(materialDetailsSliceActions.updateMaterialForm({
            fullVolume: value || ''
        }));
    }, [dispatch]);

    const onChangeMaterialDimension = useCallback((value?: Dimension) => {
        dispatch(materialDetailsSliceActions.updateMaterialForm({
            dimension: value || Dimension.NONE
        }));
    }, [dispatch]);

    const inputAutoSizer = (value: string | undefined) => {
        if (value !== undefined){
            return { width: `${(value.length + 1) * 9}px` };
        }
        return { width: '200px' };
    };

    materialForm?.materialName && console.log(inputAutoSizer(materialForm?.materialName));

    return (
        <VStack max gap={'16px'} className={classNames(cls.MaterialCard, {}, [className])}>
            <div>Информация о материале</div>
            <VStack max align={'start'} gap={'8px'} >
                <Input
                    readOnly={!editMode}
                    placeholder={'Наименование материала:'}
                    value={materialForm?.materialName}
                    onChange={onChangeMaterialName}
                    style={inputAutoSizer(materialForm?.materialName)}
                />

                <Input
                    readOnly={!editMode}
                    placeholder={'Код КСУ НСИ:'} value={materialForm?.KSUId}
                    onChange={onChangeMaterialKSUId}
                />

                <Input
                    readOnly={!editMode}
                    placeholder={'Код УПП:'} value={materialForm?.UPPId}
                    onChange={onChangeMaterialUPPId}
                />

                <Input
                    readOnly={!editMode}
                    placeholder={'Объем единицы материала:'}
                    value={materialForm?.fullVolume}
                    onChange={onChangeMaterialFullVolume}
                />

                <DimensionSelect
                    readOnly={!editMode}
                    value={materialForm?.dimension}
                    onChange={onChangeMaterialDimension}
                />
            </VStack>
        </VStack>
    );
});

MaterialCard.displayName = 'MaterialCard';