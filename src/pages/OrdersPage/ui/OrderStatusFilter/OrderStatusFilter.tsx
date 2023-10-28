import cls from './OrderStatusFilter.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { HStack, VStack } from '@/shared/ui/Stack';
import { OrderStatus, orderStatusMapper } from '@/shared/const/orderConsts';
import { BoundaryLine } from '@/shared/ui/BoundaryLine/BoundaryLine';
import { Overlay } from '@/shared/ui/Overlay';
import { useSelector } from 'react-redux';
import { getOrderStatusBoxFormValues, orderListFiltersSliceActions } from '@/features/orderListFilters';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface OrderStatusFilterProps {
    className?: string
}

const orderStatus = [
    { value: orderStatusMapper.none, content: OrderStatus.NONE },
    { value: orderStatusMapper.issued, content: OrderStatus.ISSUED },
    { value: orderStatusMapper.waiting_for_request, content: OrderStatus.WAITING_FOR_REQUEST },
    { value: orderStatusMapper.executing, content: OrderStatus.EXECUTING },
    { value: orderStatusMapper.agreement, content: OrderStatus.AGREEMENT },
    { value: orderStatusMapper.waiting_for_technical_closing, content: OrderStatus.WAITING_FOR_TECHNICAL_CLOSING },
    { value: orderStatusMapper.technical_closed, content: OrderStatus.TECHNICAL_CLOSED },
];

export const OrderStatusFilter = memo((props: OrderStatusFilterProps) => {
    const { className } = props;
    const [showOrderStatusFilter, setShowOrderStatusFilter] = useState(false);
    const orderStatusBoxValues = useSelector(getOrderStatusBoxFormValues) ?? {};
    const dispatch = useAppDispatch();

    const onOpenHandler = useCallback(() => {
        setShowOrderStatusFilter((prev)=>!prev);
    },[]);

    const onApplyHandler = useCallback(()=>{
        setShowOrderStatusFilter(false);
        dispatch(orderListFiltersSliceActions.setOrderStatusBoxForm());
    },[dispatch]);

    const onCloseHandler = useCallback(()=>{
        setShowOrderStatusFilter(false);
        dispatch(orderListFiltersSliceActions.resetOrderStatusBoxForm());
    },[dispatch]);

    const onCheckBoxChangeHandler = useCallback((field: string, checked: boolean) => {
        const payload = {
            status: !checked,
            field: field
        };
        dispatch(orderListFiltersSliceActions.toggleOrderStatusBoxElement(payload));
    },[dispatch]);

    const onAllCheckBoxChangeHandler = useCallback((checked: boolean)=>{
        dispatch(orderListFiltersSliceActions.setOrderStatusBoxElements(checked));
    },[dispatch]);

    const OrderStatusFilterPanel = () => {
        return (
            <div>
                <Overlay className={cls.overlay} onClick={onCloseHandler}/>
                <VStack className={cls.filterTable} gap={'4px'}>
                    <HStack gap={'16px'}>
                        <input
                            type={'checkbox'}
                            checked={!Object.values(orderStatusBoxValues).includes(false)}
                            onChange={()=>onAllCheckBoxChangeHandler(Object.values(orderStatusBoxValues).includes(false))}
                        />
                        <Text
                            text='Выбрать все'
                            onClick={()=>onAllCheckBoxChangeHandler(Object.values(orderStatusBoxValues).includes(false))}
                            className={cls.text}
                        />
                    </HStack>
                    <BoundaryLine/>
                    {orderStatus.map(el => {
                        return (
                            <HStack key={el.content} gap={'16px'}>
                                <input
                                    type={'checkbox'}
                                    checked={orderStatusBoxValues[el.content] ?? true}
                                    onChange={()=>onCheckBoxChangeHandler(el.content, orderStatusBoxValues[el.content])}
                                />
                                <Text
                                    text={el.value}
                                    onClick={()=>onCheckBoxChangeHandler(el.content, orderStatusBoxValues[el.content])}
                                    className={cls.text}
                                />
                            </HStack>)
                        ;
                    })}

                </VStack>
            </div>

        );
    };

    return (
        <div className={classNames(cls.OrderStatusFilter, {}, [className])}>
            {showOrderStatusFilter
                ? <Button
                    onClick={onApplyHandler}
                    theme={ButtonTheme.OUTLINE_GREEN}
                    className={cls.applyBtn}
                >Применить</Button>
                : <Button onClick={onOpenHandler}>Состояние заказа</Button>
            }
            {showOrderStatusFilter && <OrderStatusFilterPanel/>}
        </div>
    );
});

OrderStatusFilter.displayName = 'OrderStatusFilter';