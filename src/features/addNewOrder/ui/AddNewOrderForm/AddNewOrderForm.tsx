import cls from './AddNewOrderForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addNewOrderActions, addNewOrderReducer } from '../../model/slice/addNewOrderSlice';
import { Text, TextTheme } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getNewOrderId } from '../../selectors/getNewOrderId/getNewOrderId';
import { getNewOrderDescription } from '../../selectors/getNewOrderDescription/getNewOrderDescription';
import { getNewOrderIsLoading } from '../../selectors/getNewOrderIsLoading/getNewOrderIsLoading';
import { getNewOrderError } from '../../selectors/getNewOrderError/getNewOrderError';
import { addNewOrder, getNewOrderYearOfExecution } from '../../index';
import { getUserAuthData } from '@/entities/User';
import { Button } from '@/shared/ui/Button';

export interface AddNewOrderFormProps {
    className?: string
    onSuccess: () => void
}

const AddNewOrderForm = memo((props: AddNewOrderFormProps) => {

    const initialReducers: ReducerList = {
        newOrder: addNewOrderReducer
    };

    const { className, onSuccess } = props;
    const newOrderId = useSelector(getNewOrderId);
    const newOrderDescription = useSelector(getNewOrderDescription);
    const newOrderYearOfExecution = useSelector(getNewOrderYearOfExecution);
    const isLoading = useSelector(getNewOrderIsLoading);
    const error = useSelector(getNewOrderError);
    const userId = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const onChangeNewOrderId = useCallback((value: string) => {
        dispatch(addNewOrderActions.setNewOrderId(value));
    }, [dispatch]);
    const onChangeNewOrderDescription = useCallback((value: string) => {
        dispatch(addNewOrderActions.setNewOrderDescription(value));
    }, [dispatch]);
    const onChangeNewOrderYearOfExecution = useCallback((value: string) => {
        dispatch(addNewOrderActions.setNewOrderYearOfExecution(value));
    }, [dispatch]);
    const onAddNewOrderClick = useCallback(async () => {
        if (newOrderId && newOrderDescription && userId && newOrderYearOfExecution){
            const result = await dispatch(addNewOrder(
                { orderId: newOrderId,
                    description: newOrderDescription,
                    yearOfExecution: newOrderYearOfExecution,
                    userId: userId }
            ));
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(addNewOrderActions.resetForm());
                onSuccess();
            }
        }
    }, [dispatch, newOrderDescription, newOrderId, newOrderYearOfExecution, onSuccess, userId]);

    const onEnterKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onAddNewOrderClick();
        }
    }, [onAddNewOrderClick]);

    useEffect(() => {
        window.addEventListener('keydown', onEnterKeyPress);
        return () => { window.removeEventListener('keydown', onEnterKeyPress); };
    }, [onEnterKeyPress]);



    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
            <VStack gap={'8px'} className={classNames(cls.AddNewOrderForm, {}, [className])}>
                <div><Text title={'Добавление нового заказа'}/></div>
                <VStack>
                    {error && <Text title={error} theme={TextTheme.ERROR}/>}
                </VStack>
                <VStack align={'end'} gap={'8px'}>
                    <Input
                        value={newOrderId}
                        onChange={onChangeNewOrderId}
                        placeholder={'Номер заказа'}
                        between={true}
                    />
                    <Input
                        value={newOrderDescription}
                        onChange={onChangeNewOrderDescription}
                        placeholder={'Оборудование'}
                        between={true}
                    />
                    <Input
                        value={newOrderYearOfExecution}
                        onChange={onChangeNewOrderYearOfExecution}
                        placeholder={'Год выполнения'}
                        between={true}
                    />
                    <Button onClick={onAddNewOrderClick}>
                        Добавить
                    </Button>
                </VStack>


            </VStack>
        </DynamicModuleLoader>
    );
});

AddNewOrderForm.displayName = 'AddNewOrderForm';

export default AddNewOrderForm;