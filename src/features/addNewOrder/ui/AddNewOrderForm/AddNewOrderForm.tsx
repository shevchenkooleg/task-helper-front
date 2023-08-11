import cls from './AddNewOrderForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addNewOrderActions, addNewOrderReducer } from '../../model/slice/addNewOrderSlice';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { VStack } from '@/shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getNewOrderId } from '../../selectors/getNewOrderId/getNewOrderId';
import { getNewOrderDescription } from '../../selectors/getNewOrderDescription/getNewOrderDescription';
import { getNewOrderIsLoading } from '../../selectors/getNewOrderIsLoading/getNewOrderIsLoading';
import { getNewOrderError } from '../../selectors/getNewOrderError/getNewOrderError';
import { addNewOrder } from '../..';
import { getUserAuthData } from '@/entities/User';
import { Button } from '@/shared/ui/Button';

const initialReducers: ReducerList = {
    newOrder: addNewOrderReducer
};

export interface AddNewOrderFormProps {
    className?: string
    onSuccess: () => void
}

const AddNewOrderForm = memo((props: AddNewOrderFormProps) => {

    const { className, onSuccess } = props;
    const newOrderId = useSelector(getNewOrderId);
    const newOrderDescription = useSelector(getNewOrderDescription);
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
    const onAddNewOrderClick = useCallback(async () => {
        if (newOrderId && newOrderDescription && userId){
            const result = await dispatch(addNewOrder(
                { orderId: newOrderId,
                    description: newOrderDescription,
                    userId: userId }
            ));
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(addNewOrderActions.resetForm());
                onSuccess();
            }
        }
    }, [dispatch, newOrderDescription, newOrderId, onSuccess, userId]);

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
            <div className={classNames(cls.AddNewOrderForm, {}, [className])}>
                <VStack><Text title={'Добавление нового заказа'}/></VStack>
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
                    <Button onClick={onAddNewOrderClick}>
                        Добавить
                    </Button>
                </VStack>


            </div>
        </DynamicModuleLoader>
    );
});

AddNewOrderForm.displayName = 'AddNewOrderForm';

export default AddNewOrderForm;