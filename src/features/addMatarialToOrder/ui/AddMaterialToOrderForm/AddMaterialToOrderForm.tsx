import cls from './AddMaterialToOrderForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useSelector } from 'react-redux';
import { getMaterialToOrderError } from '../../model/selectors/getMaterialToOrderError/getMaterialToOrderError';
import { materialToOrderSliceActions, materialToOrderSliceReducer } from '../../model/slice/materialToOrderSlice';
import { ComboBox } from '@/shared/ui/Popups/ui/ComboBox/ComboBox';
import { getMaterialToOrderForm } from '../../model/selectors/getMaterialToOrderForm/getMaterialToOrderForm';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { fetchMaterialsForComboBox } from '../../model/services/fetchMaterialsForComboBox/fetchMaterialsForComboBox';
import {
    getMaterialToOrderMaterialList
} from '../../model/selectors/getMaterialToOrderMaterialList/getMaterialToOrderMaterialList';
import { Material } from '@/entities/Material';
import { expandDataForMaterial, orderDetailsSliceActions } from '@/entities/Order';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ModalMode } from '@/shared/const/modalConst';


export interface AddMaterialToOrderFormProps {
    className?: string
    onSuccess: () => void
    mode?: ModalMode
    onClose: () => void
}

const AddMaterialToOrderForm = memo((props: AddMaterialToOrderFormProps) => {
    const { className, onSuccess, mode, onClose } = props;
    const dispatch = useAppDispatch();

    
    const initialReducers: ReducerList = {
        materialToOrder: materialToOrderSliceReducer
    };

    const error = useSelector(getMaterialToOrderError);
    const form = useSelector(getMaterialToOrderForm);
    const [query, setQuery] = useState('');
    const materialList = useSelector(getMaterialToOrderMaterialList);
    const materialToOrderForm = useSelector(getMaterialToOrderForm);

    const onChangeMaterialToOrderMaterialId = useCallback((value: Material) => {
        // dispatch(materialToOrderSliceActions.setMaterialId(value._id));
        dispatch(materialToOrderSliceActions.setMaterialToOrderFormData(value));
    }, [dispatch]);
    const onChangeMaterialToOrderQuantityPerUnit = useCallback((value: string) => {
        dispatch(materialToOrderSliceActions.setQuantityPerUnit(value));
    }, [dispatch]);
    const onChangeMaterialToOrderTotalUnitsCount = useCallback((value: string) => {
        dispatch(materialToOrderSliceActions.setTotalUnitsCount(value));
    }, [dispatch]);



    const fetchMaterialsForComboBoxHandler = useCallback(() => {
        dispatch(fetchMaterialsForComboBox(query));
    }, [dispatch, query]);

    const debouncedFetchData = useDebounce(fetchMaterialsForComboBoxHandler, 500);

    useEffect(()=>{
        debouncedFetchData();
    },[debouncedFetchData, query]);

    const onChangeMaterialToOrderComboBoxQuery = useCallback((value: string) => {
        setQuery(value);
    }, []);

    const addMaterialToOrderHandler = () => {
        console.log('form ', form);
        form && dispatch(expandDataForMaterial(form));
    };

    const onCancelClickHandler = useCallback(()=>{
        onClose();
    },[onClose]);

    const onUpdateClickHandler = useCallback(()=> {
        form && dispatch(orderDetailsSliceActions.updateMaterialDataInOrder(form));
        onClose();
    },[dispatch, form, onClose]);

    const onDeleteClickHandler = useCallback(()=>{
        form?._id && dispatch(orderDetailsSliceActions.deleteMaterialInOrder(form?._id));
        onClose();
    },[dispatch, form?._id, onClose]);

    const ButtonBlock = () => {
        if (mode === ModalMode.UPDATE){
            return (
                <HStack max justify={'between'} className={cls.btnBlock}>
                    <Button
                        theme={ButtonTheme.OUTLINE_RED}
                        onClick={onDeleteClickHandler}
                    >
                        Удалить
                    </Button>
                    <HStack>

                        <Button
                            theme={ButtonTheme.OUTLINE_RED}
                            onClick={onCancelClickHandler}
                            style={{ marginRight: '20px' }}
                        >
                            Отмена
                        </Button>
                        <Button
                            theme={ButtonTheme.OUTLINE_GREEN}
                            onClick={onUpdateClickHandler}
                        >
                            Обновить
                        </Button>
                    </HStack>
                </HStack>

            );
        }
        return (
            <div className={cls.btnBlock}>
                <Button
                    onClick={addMaterialToOrderHandler}>
                Добавить материал
                </Button>
            </div>

        );
    };

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
            <VStack gap={'8px'} className={classNames(cls.AddMaterialToOrderForm, {}, [className])}>
                <div><Text title={'Добавление материала в заказ'}/></div>
                <VStack>
                    {error && <Text title={error} theme={TextTheme.ERROR}/>}
                </VStack>
                <VStack align={'end'} gap={'8px'}>
                    <ComboBox<Material>
                        value={materialToOrderForm?.materialName ?? ''}
                        placeholder={'Название материала/Код КСУ'}
                        query={query}
                        setQuery={onChangeMaterialToOrderComboBoxQuery}
                        items={materialList}
                        callback={onChangeMaterialToOrderMaterialId}
                    // between={true}
                    />
                    <Input
                        value={form?.quantityPerUnit ?? ''}
                        onChange={onChangeMaterialToOrderQuantityPerUnit}
                        placeholder={'количество на ед.оборудования'}
                        between={true}
                    />
                    <Input
                        value={form?.totalUnitsCount ?? ''}
                        onChange={onChangeMaterialToOrderTotalUnitsCount}
                        placeholder={'общее количество ед.оборудования'}
                        between={true}
                    />
                    <Input
                        readOnly={true}
                        value={form?.totalQuantity ?? ''}
                        placeholder={'общее количество материала'}
                        between={true}
                    />
                    <ButtonBlock/>
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

AddMaterialToOrderForm.displayName = 'AddMaterialToOrderForm';

export default AddMaterialToOrderForm;