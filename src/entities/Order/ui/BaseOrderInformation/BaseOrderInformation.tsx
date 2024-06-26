import cls from './BaseOrderInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { MListBox } from '@/shared/ui/Popups';
import { orderExecutionTypeOptions, orderStatusOptions, orderTypeOptions } from '@/shared/const/orderDetailsConsts';
import {
    OrderExecutionType,
    orderExecutionTypeMapper,
    OrderType,
    orderTypeMapper
} from '@/shared/const/addNewOrderConsts';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { orderDetailsSliceActions } from '../../model/slice/orderDetailsSlice';
import { OrderStatus } from '@/shared/const/orderConsts';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { Card } from '@/shared/ui/Card';
import { StatusLine } from '@/shared/ui/StatusLine/StatusLine';

interface BaseOrderInformationProps {
    className?: string
}

export const BaseOrderInformation = memo((props: BaseOrderInformationProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const orderFormData = useSelector(getOrderFormData);
    const editMode = useSelector(getOrderDetailsEditMode);
    const orderStatus = useSelector(getOrderFormData)?.orderStatus;


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
    const onChangeOrderStatus = useCallback((value?: string) => {
        editMode && dispatch(orderDetailsSliceActions.updateOrderForm({
            orderStatus: value as OrderStatus || OrderStatus.NONE
        }));
    }, [dispatch, editMode]);
    const onChangeDescription = useCallback((value?: string) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            description: value || ''
        }));
    }, [dispatch]);


    return (
        <div className={classNames(cls.BaseOrderInformation, {}, [className])}>
            <h4>Основная информация</h4>
            <Card>
                <VStack align={'start'} max={true} gap={'4px'} className={cls.card}>
                    <HStack gap={'16px'} justify={'between'} max={true}>
                        <VStack gap={'24px'} justify={'between'} align={'start'} max={true}>
                            <HStack gap={'24px'}>
                                <div>№ заказа:</div>
                                <Text text={orderFormData?.orderId}/>
                            </HStack>
                            <HStack gap={'8px'}>
                                <div>Способ выполнения:</div>
                                <MListBox
                                    value={orderFormData?.orderType && orderTypeMapper[orderFormData?.orderType]}
                                    onChange={onChangeOrderType}
                                    items={orderTypeOptions}
                                    readOnly={!editMode}
                                />
                            </HStack>
                            <HStack gap={'8px'}>
                                <div>Способ планирования:</div>
                                <MListBox
                                    value={orderFormData?.orderExecutionType && orderExecutionTypeMapper[orderFormData?.orderExecutionType]}
                                    onChange={onChangeOrderExecutionType}
                                    items={orderExecutionTypeOptions}
                                    readOnly={!editMode}
                                />
                            </HStack>
                            <HStack gap={'8px'} justify={'between'}>
                                <div>Комментарий:</div>
                                <Input
                                    value={orderFormData?.description}
                                    onChange={onChangeDescription}
                                    autoWidth={true}
                                    readOnly={!editMode}
                                />
                            </HStack>
                            <StatusLine
                                editMode={editMode}
                                onChange={onChangeOrderStatus}
                                statusOptions={orderStatusOptions}
                                currentStatus={orderStatus}
                            />
                        </VStack>
                    </HStack>
                    {/*<HStack gap={'8px'} width={'240px'}>*/}
                    {/*    <OrderStatusSelect*/}
                    {/*        value={orderFormData?.orderStatus}*/}
                    {/*        onChange={onChangeOrderStatus}*/}
                    {/*        size={ButtonSize.SIZE_S}*/}
                    {/*        readOnly={!editMode}*/}
                    {/*    />*/}
                    {/*</HStack>*/}
                </VStack>
            </Card>
        </div>
    );
});

BaseOrderInformation.displayName = 'BaseOrderInformation';