import cls from './OrderPageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';


import { OrderStatusFilter } from '../OrderStatusFilter/OrderStatusFilter';
import { OrdersYearsOfExecutionSelect } from '../OrdersYearsOfExecutionSelect/OrdersYearsOfExecutionSelect';
import { Search } from '@/shared/ui/Search';
import { useSelector } from 'react-redux';
import { getSearchValue, orderListFiltersSliceActions } from '@/features/orderListFilters';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface OrderPageToolsPanelProps {
    className?: string
    addOrderCallback?: () => void
    refreshOrdersCallback?: () => void
}

export const OrderPageToolsPanel = memo((props: OrderPageToolsPanelProps) => {
    const { className, addOrderCallback, refreshOrdersCallback } = props;
    const searchValue = useSelector(getSearchValue) ?? '';
    const dispatch = useAppDispatch();


    const onChange = (newValue: string) => {
        dispatch(orderListFiltersSliceActions.setSearchValue(newValue));
    };

    return (
        <HStack
            gap={'32px'}
            justify={'between'}
            max
            className={classNames(cls.OrderPageToolsPanel, {}, [className])}>
            <HStack gap={'32px'}>
                <OrdersYearsOfExecutionSelect/>
                <OrderStatusFilter/>
                <Search value={searchValue} onChange={onChange}/>
            </HStack>
            <HStack gap={'32px'}>
                <Button onClick={refreshOrdersCallback}>обновить заказы</Button>
                <Button onClick={addOrderCallback}>добавить заказ</Button>
            </HStack>
        </HStack>
    );
});

OrderPageToolsPanel.displayName = 'OrderPageToolsPanel';