import cls from './OrderStatusFilter.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonSize } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { OrderStatus, orderStatusMapper } from '@/shared/const/orderConsts';
import { BoundaryLine, BoundaryLineColor } from '@/shared/ui/BoundaryLine/BoundaryLine';
import { Overlay } from '@/shared/ui/Overlay';
import { useSelector } from 'react-redux';
import {
    getOrderStatusBoxFormValues,
    getOrderStatusBoxValues,
    orderListFiltersSliceActions
} from '@/features/orderListFilters';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { NotificationPoint } from '@/shared/ui/NotificationPoint';
import { NotificationColor, NotificationTheme } from '@/shared/ui/NotificationPoint/ui/NotificationPoint';
import { ButtonColor } from '@/shared/ui/Button/ui/Button';
import { TextColor } from '@/shared/ui/Text/ui/Text';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

interface OrderStatusFilterProps {
    className?: string
}


//TODO fix 'orderStatus' const in component

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
    const orderStatusBoxFormValues = useSelector(getOrderStatusBoxFormValues) ?? {};
    const orderStatusBoxValues = useSelector(getOrderStatusBoxValues) ?? {};
    const dispatch = useAppDispatch();

    console.log('orderStatusBoxFormValues ', orderStatusBoxFormValues);
    console.log('orderStatusBoxValues ', orderStatusBoxValues);

    const onOpenHandler = useCallback(() => {
        setShowOrderStatusFilter((prev)=>!prev);
    },[]);

    const onApplyHandler = useCallback(()=>{
        setShowOrderStatusFilter(false);
        dispatch(orderListFiltersSliceActions.setOrderStatusBoxForm());
    },[dispatch]);

    // const onCloseHandler = useCallback(()=>{
    //     setShowOrderStatusFilter(false);
    //     dispatch(orderListFiltersSliceActions.resetOrderStatusBoxForm());
    // },[dispatch]);

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
                <Overlay className={cls.overlay} onClick={onApplyHandler}/>
                <VStack className={cls.filterTable}>
                    <HStack max={true} className={cls.item}>
                        <input
                            type={'checkbox'}
                            checked={!Object.values(orderStatusBoxFormValues).includes(false)}
                            onChange={()=>onAllCheckBoxChangeHandler(Object.values(orderStatusBoxFormValues).includes(false))}
                            className={cls.checkBox}
                        />
                        <CheckIcon
                            className={classNames(cls.checkIcon, { [cls.selected]: !Object.values(orderStatusBoxFormValues).includes(false) } , [])}
                            onClick={()=>onAllCheckBoxChangeHandler(Object.values(orderStatusBoxFormValues).includes(false))}
                        />
                        <div
                            onClick={()=>onAllCheckBoxChangeHandler(Object.values(orderStatusBoxFormValues).includes(false))}
                            className={cls.text}
                            color={TextColor.BLACK}
                        >{'Выбрать все'}</div>
                    </HStack>
                    <BoundaryLine color={BoundaryLineColor.BLACK}/>
                    {orderStatus.map(el => {
                        return (
                            <HStack key={el.content} className={cls.item} max>
                                <input
                                    type={'checkbox'}
                                    checked={orderStatusBoxFormValues[el.content] ?? true}
                                    onChange={()=>onCheckBoxChangeHandler(el.content, orderStatusBoxFormValues[el.content])}
                                    className={cls.checkBox}
                                />
                                <CheckIcon
                                    className={classNames(cls.checkIcon, { [cls.selected]: orderStatusBoxFormValues[el.content] } , [])}
                                    onClick={()=>onCheckBoxChangeHandler(el.content, orderStatusBoxFormValues[el.content])}
                                />
                                <div
                                    onClick={()=>onCheckBoxChangeHandler(el.content, orderStatusBoxFormValues[el.content])}
                                    className={cls.text}
                                >{el.value}</div>
                            </HStack>)
                        ;
                    })}

                </VStack>
            </div>

        );
    };

    return (
        <div className={classNames(cls.OrderStatusFilter, {}, [className])}>
            <NotificationPoint
                notificationText={
                    Object.values(orderStatusBoxValues).filter(el=>el).length < Object.values(OrderStatus).length
                        ? String(Object.values(orderStatusBoxValues).filter(el=>el).length)
                        : ''
                }
                color={NotificationColor.ORANGE}
                rounded
                theme={NotificationTheme.BACKGROUND}
                right={'130'}
                top={'-3'}
            >
                <Button onClick={onOpenHandler} size={ButtonSize.SIZE_S} rounded={true} color={ButtonColor.SECONDARY_COLOR} style={{ position: 'relative', width: '140px', padding: '6px 20px 6px 5px' }}>
                    Состояние заказа
                    <ChevronDownIcon
                        className={cls.dropIcon}
                        aria-hidden="true"
                    />
                </Button>
            </NotificationPoint>
            
            {showOrderStatusFilter && <OrderStatusFilterPanel/>}
        </div>
    );
});

OrderStatusFilter.displayName = 'OrderStatusFilter';