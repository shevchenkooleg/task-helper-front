import cls from './OrderPageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';


import { OrderStatusFilter } from '../OrderStatusFilter/OrderStatusFilter';
import { OrdersYearsOfExecutionSelect } from '../OrdersYearsOfExecutionSelect/OrdersYearsOfExecutionSelect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import AddCircleIcon from '@/shared/assets/icons/AddCircleIcon2.svg';
import RefreshIcon from '@/shared/assets/icons/RefreshIcon3.svg';
import SettingsIcon from '@/shared/assets/icons/SettingsIcon2.svg';
import { Icon } from '@/shared/ui/Icon';
import { ordersPageSliceActions } from '../..';
import { Search } from '@/shared/ui/Search';


interface OrderPageToolsPanelProps {
    className?: string
    addOrderCallback?: () => void
    refreshOrdersCallback?: () => void
    orderPanelSettingsClickCallback: () => void
    newDesign?: boolean
}

export const OrderPageToolsPanel = memo((props: OrderPageToolsPanelProps) => {
    const { className, addOrderCallback, refreshOrdersCallback,
        orderPanelSettingsClickCallback, newDesign = false } = props;
    const dispatch = useAppDispatch();
    const searchCallBack = useCallback((item: string)=>{
        dispatch(ordersPageSliceActions.searchInOrders(item));
    },[dispatch]);


    if (newDesign){
        return (
            <HStack
                justify={'between'}
                max
                className={classNames(cls.OrderPageToolsPanel, {}, [className])}>
                <HStack>
                    <Button theme={ButtonTheme.BACKGROUND_GREEN} size={ButtonSize.SIZE_S} rounded={true}>
                        Создать заказ
                    </Button>
                </HStack>
                <HStack>
                    <OrdersYearsOfExecutionSelect/>
                </HStack>
                {/*<HStack gap={'32px'}>*/}
                {/*    <OrdersYearsOfExecutionSelect/>*/}
                {/*    <OrderStatusFilter/>*/}
                {/*    <Search callBack={searchCallBack} placeholder={'Поиск по заказам'}/>*/}
                {/*</HStack>*/}
                {/*<HStack gap={'4px'}>*/}
                {/*    <Button onClick={refreshOrdersCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={RefreshIcon}/>}</Button>*/}
                {/*    <Button className={cls.settingsBtn} onClick={orderPanelSettingsClickCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={SettingsIcon}/>}</Button>*/}
                {/*    <Button onClick={addOrderCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={AddCircleIcon}/>}</Button>*/}
                {/*</HStack>*/}
            </HStack>
        );
    }

    return (
        <HStack
            gap={'32px'}
            justify={'between'}
            max
            className={classNames(cls.OrderPageToolsPanel, {}, [className])}>
            <HStack gap={'32px'}>
                <OrdersYearsOfExecutionSelect/>
                <OrderStatusFilter/>
                <Search callBack={searchCallBack} placeholder={'Поиск по заказам'}/>
            </HStack>
            <HStack gap={'4px'}>
                <Button onClick={refreshOrdersCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={RefreshIcon}/>}</Button>
                <Button className={cls.settingsBtn} onClick={orderPanelSettingsClickCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={SettingsIcon}/>}</Button>
                <Button onClick={addOrderCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={AddCircleIcon}/>}</Button>
            </HStack>
        </HStack>
    );
});

OrderPageToolsPanel.displayName = 'OrderPageToolsPanel';