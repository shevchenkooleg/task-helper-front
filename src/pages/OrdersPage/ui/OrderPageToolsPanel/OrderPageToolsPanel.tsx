import cls from './OrderPageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button, ButtonTheme } from '@/shared/ui/Button';


import { OrderStatusFilter } from '../OrderStatusFilter/OrderStatusFilter';
import { OrdersYearsOfExecutionSelect } from '../OrdersYearsOfExecutionSelect/OrdersYearsOfExecutionSelect';
import { useSelector } from 'react-redux';
import { getSearchValue, orderListFiltersSliceActions } from '@/features/orderListFilters';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { OrderSearch } from '../OrderSearch/OrderSearch';
import AddCircleIcon from '@/shared/assets/icons/AddCircleIcon2.svg';
import RefreshIcon from '@/shared/assets/icons/RefreshIcon3.svg';
import SettingsIcon from '@/shared/assets/icons/SettingsIcon2.svg';
import { Icon } from '@/shared/ui/Icon';


interface OrderPageToolsPanelProps {
    className?: string
    addOrderCallback?: () => void
    refreshOrdersCallback?: () => void
    settingsOrdersCallback?: () => void
}

export const OrderPageToolsPanel = memo((props: OrderPageToolsPanelProps) => {
    const { className, addOrderCallback, refreshOrdersCallback, settingsOrdersCallback = ()=> {
        console.log('settings');} } = props;
    const searchValue = useSelector(getSearchValue) ?? '';
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    console.log('searchQuery, ', searchQuery);


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
                <OrderSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                {/*<Search value={searchValue} onChange={onChange}/>*/}
            </HStack>
            <HStack gap={'4px'}>
                <Button onClick={refreshOrdersCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={RefreshIcon}/>}</Button>
                <Button onClick={settingsOrdersCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={SettingsIcon}/>}</Button>
                <Button onClick={addOrderCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={AddCircleIcon}/>}</Button>
            </HStack>
        </HStack>
    );
});

OrderPageToolsPanel.displayName = 'OrderPageToolsPanel';