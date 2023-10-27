import cls from './OrderPageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';


import { OrderStatusFilter } from '../OrderStatusFilter/OrderStatusFilter';
import { OrdersYearsOfExecutionSelect } from '../OrdersYearsOfExecutionSelect/OrdersYearsOfExecutionSelect';

interface OrderPageToolsPanelProps {
    className?: string
    addOrderCallback?: () => void
    refreshOrdersCallback?: () => void
}

export const OrderPageToolsPanel = memo((props: OrderPageToolsPanelProps) => {
    const { className, addOrderCallback, refreshOrdersCallback } = props;

    return (
        <HStack
            gap={'32px'}
            justify={'between'}
            max
            className={classNames(cls.OrderPageToolsPanel, {}, [className])}>
            <HStack gap={'32px'}>
                <OrdersYearsOfExecutionSelect/>
                <OrderStatusFilter/>
            </HStack>
            <HStack gap={'32px'}>
                <Button onClick={refreshOrdersCallback}>обновить заказы</Button>
                <Button onClick={addOrderCallback}>добавить заказ</Button>
            </HStack>
        </HStack>
    );
});

OrderPageToolsPanel.displayName = 'OrderPageToolsPanel';