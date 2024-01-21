import cls from './BaseOrderInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { ListBox } from '@/shared/ui/Popups';
import { ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { orderExecutionTypeOptions, orderTypeOptions } from '@/shared/const/orderDetailsConsts';
import {
    OrderExecutionType,
    orderExecutionTypeMapper,
    OrderType,
    orderTypeMapper
} from '@/shared/const/addNewOrderConsts';
import { OrderStatusSelect } from '../OrderStatusSelect/OrderStatusSelect';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { orderDetailsSliceActions } from '../../model/slice/orderDetailsSlice';
import { OrderStatus } from '@/shared/const/orderConsts';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';

interface BaseOrderInformationProps {
    className?: string
}

export const BaseOrderInformation = memo((props: BaseOrderInformationProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const orderFormData = useSelector(getOrderFormData);
    const editMode = !useSelector(getOrderDetailsEditMode);


    const onChangeOrderType = useCallback((newType: string)=>{
        dispatch(orderDetailsSliceActions.updateOrderForm({
            orderType: newType as OrderType || OrderType.INDEPENDENT
        }));
    },[dispatch]);
    const onChangeOrderExecutionType = useCallback((newOrderExecutionType: string) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            orderExecutionType: newOrderExecutionType as OrderExecutionType || OrderExecutionType.PLANNED
        }));
    },[dispatch]);
    const onChangeOrderStatus = useCallback((value?: OrderStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            orderStatus: value || OrderStatus.NONE
        }));
    }, [dispatch]);
    const onChangeDescription = useCallback((value?: string) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            description: value || ''
        }));
    }, [dispatch]);


    return (
        <div className={classNames(cls.BaseOrderInformation, {}, [className])}>
            <h4>Основная информация</h4>
            <VStack align={'start'} max={true} gap={'4px'}>
                <HStack gap={'16px'} justify={'between'}  max={true}>
                    <HStack gap={'16px'} justify={'between'}>
                        <HStack gap={'8px'} width={'190px'}>
                            <div>№ заказа:</div>
                            <Text text={orderFormData?.orderId}/>
                        </HStack>
                        <HStack gap={'8px'}>
                            <ListBox
                                value={orderFormData?.orderType && orderTypeMapper[orderFormData?.orderType]}
                                onChange={onChangeOrderType}
                                buttonTheme={ButtonTheme.CLEAR}
                                items={orderTypeOptions}
                                readOnly={editMode}
                            />
                            <ListBox
                                value={orderFormData?.orderExecutionType && orderExecutionTypeMapper[orderFormData?.orderExecutionType]}
                                onChange={onChangeOrderExecutionType}
                                buttonTheme={ButtonTheme.CLEAR}
                                items={orderExecutionTypeOptions}
                                readOnly={editMode}
                            />
                        </HStack>
                    </HStack>
                    <HStack gap={'8px'} width={'240px'}>
                        <OrderStatusSelect
                            value={orderFormData?.orderStatus}
                            onChange={onChangeOrderStatus}
                            size={ButtonSize.SIZE_S}
                            readOnly={editMode}
                        />
                    </HStack>
                </HStack>
                <HStack gap={'8px'} justify={'between'}>
                    <div>Оборудование:</div>
                    <Input
                        value={orderFormData?.description}
                        onChange={onChangeDescription}
                        autoWidth={true}
                        readOnly={editMode}
                    />
                </HStack>
            </VStack>
        </div>
    );
});

BaseOrderInformation.displayName = 'BaseOrderInformation';