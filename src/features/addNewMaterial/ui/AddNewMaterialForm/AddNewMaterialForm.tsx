import cls from './AddNewMaterialForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { AddNewMaterialSliceActions, AddNewMaterialSliceReducer } from '../../model/slice/addNewMaterialSlice';
import { getNewMaterialName } from '../../model/selectors/getNewMaterialName/getNewMaterialName';
import { useSelector } from 'react-redux';
import { getNewMaterialKSUId } from '../../model/selectors/getNewMaterialKSUId/getNewMaterialKSUId';
import { getNewMaterialDimension } from '../../model/selectors/getNewMaterialDimension/getNewMaterialDimension';
import { getNewMaterialFullVolume } from '../../model/selectors/getNewMaterialFullVolume/getNewMaterialFullVolume';
import { getNewMaterialError } from '../../model/selectors/getNewMaterialError/getNewMaterialError';
import { getNewMaterialIsLoading } from '../../model/selectors/getNewMaterialIsLoading/getNewMaterialIsLoading';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Dimension, DimensionSelect } from '@/entities/Dimension';
import { Button } from '@/shared/ui/Button';
import { addNewMaterial } from '../../model/services/addNewMaterial/addNewMaterial';
import { getNewMaterialUPPId } from '../../model/selectors/getNewMaterialUPPId/getNewMaterialUPPId';

export interface AddNewMaterialFormProps {
    className?: string
    onSuccess: () => void
}

const AddNewMaterialForm = memo((props: AddNewMaterialFormProps) => {
    const { className, onSuccess } = props;
    const dispatch = useAppDispatch();

    const initialReducers: ReducerList = {
        newMaterial: AddNewMaterialSliceReducer
    };

    const error = useSelector(getNewMaterialError);
    const isLoading = useSelector(getNewMaterialIsLoading);
    const newMaterialName = useSelector(getNewMaterialName);
    const newMaterialKSUId = useSelector(getNewMaterialKSUId);
    const newMaterialUPPId = useSelector(getNewMaterialUPPId);
    const newMaterialDimension = useSelector(getNewMaterialDimension);
    const newMaterialFullVolume = useSelector(getNewMaterialFullVolume);


    const onChangeNewMaterialName = useCallback((value: string) => {
        dispatch(AddNewMaterialSliceActions.setNewMaterialName(value));
    },[dispatch]);

    const onChangeNewMaterialKSUId = useCallback((value: string) => {
        dispatch(AddNewMaterialSliceActions.setNewMaterialKSUId(value));
    },[dispatch]);

    const onChangeNewMaterialUPPId = useCallback((value: string) => {
        dispatch(AddNewMaterialSliceActions.setNewMaterialUPPId(value));
    },[dispatch]);

    const onChangeNewMaterialFullVolume = useCallback((value: string) => {
        dispatch(AddNewMaterialSliceActions.setNewMaterialFullVolume(value));
    },[dispatch]);

    const onChangeNewMaterialDimension = useCallback((value: string) => {
        console.log('change');
        dispatch(AddNewMaterialSliceActions.setNewMaterialDimension(value));
    },[dispatch]);

    const onAddNewMaterialClick = useCallback(async () => {
        if (newMaterialName && newMaterialDimension && newMaterialFullVolume && newMaterialKSUId){
            const result = await dispatch(addNewMaterial({
                materialName: newMaterialName,
                dimension: newMaterialDimension,
                fullVolume: newMaterialFullVolume,
                KSUId: newMaterialKSUId
            }));
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(AddNewMaterialSliceActions.resetForm());
                onSuccess();
            }
        }
    },[dispatch, newMaterialDimension, newMaterialFullVolume, newMaterialKSUId, newMaterialName, onSuccess]);


    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
            <VStack gap={'8px'} className={classNames(cls.AddNewMaterialForm, {}, [className])}>
                <div><Text title={'Добавление нового материала'}/></div>
                <VStack>
                    {error && <Text title={error} theme={TextTheme.ERROR}/>}
                </VStack>
                <VStack align={'end'} gap={'8px'}>
                    <Input
                        value={newMaterialName ?? ''}
                        onChange={onChangeNewMaterialName}
                        placeholder={'Название материала'}
                        between={true}
                    />
                    <Input
                        value={newMaterialKSUId ?? ''}
                        onChange={onChangeNewMaterialKSUId}
                        placeholder={'Код КСУ НСИ'}
                        between={true}
                    />
                    <Input
                        value={newMaterialUPPId ?? ''}
                        onChange={onChangeNewMaterialUPPId}
                        placeholder={'Код УПП'}
                        between={true}
                    />
                    <Input
                        value={newMaterialFullVolume ?? ''}
                        onChange={onChangeNewMaterialFullVolume}
                        placeholder={'Объем единицы материала'}
                        between={true}
                    />
                    <DimensionSelect
                        value={newMaterialDimension ?? Dimension.NONE}
                        onChange={onChangeNewMaterialDimension}
                    />
                    <Button onClick={onAddNewMaterialClick}>
                        Добавить материал
                    </Button>
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

AddNewMaterialForm.displayName = 'AddNewMaterialForm';

export default AddNewMaterialForm;