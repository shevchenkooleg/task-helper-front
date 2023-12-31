import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './OrdersPage.module.scss';
import { memo, useCallback, useEffect, useState } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ordersPageSliceActions, ordersPageSliceReducer } from '../../model/slice/ordersPageSlice';
import { VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { getOrderListSelector, getOrdersList } from '@/features/getOrdersList';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';
import { AddNewOrderModal } from '@/features/addNewOrder';
import { OrderPageToolsPanel } from '../OrderPageToolsPanel/OrderPageToolsPanel';
import { OrdersPageTable } from '../OrdersPageTable/OrdersPageTable';
import {
    getOrderListFilterField,
    getOrderListFiltersSortOrder, getOrderListFiltersYearOfExecution,
    getOrderStatusBoxValues,
    orderListFiltersSliceReducer
} from '@/features/orderListFilters';
import { useSearchParams } from 'react-router-dom';
import { initOrdersPage } from '../../model/services/initOrdersPage';
import { OrderPageSettingsSideBar } from '../OrderPageSettingsSideBar/OrderPageSettingsSideBar';
import { ORDERS_TABLE_ACTIVE_KEYS } from '@/shared/const/localStorage';
import { orderTabHeaderKeysArr } from '@/shared/const/orderConsts';

interface OrdersPageProps {
    className?: string
}

const OrdersPage = (props: OrdersPageProps) => {
    const { className } = props;
    const userId = useSelector(getUserAuthData);
    const ordersList = useSelector(getOrderListSelector);
    const sortOrder = useSelector(getOrderListFiltersSortOrder);
    const sortField = useSelector(getOrderListFilterField);
    const yearOfExecutionValue = useSelector(getOrderListFiltersYearOfExecution);
    const orderStatusBoxValues  = useSelector(getOrderStatusBoxValues);
    const reducers: ReducerList = {
        orders: ordersPageSliceReducer,
        orderFilters: orderListFiltersSliceReducer
    };
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const [isOrderPageSettingsSideBarShow, setIsOrderPageSettingsSideBarShow] = useState(false);

    const localStorageOrderTableKeys = localStorage.getItem(ORDERS_TABLE_ACTIVE_KEYS);


    const onModalClose = useCallback(() => {
        console.log('request order because modal close');
        dispatch(getOrdersList(null));
        setIsNewOrderModalOpen(false);
    },[dispatch]);

    const onLoadClickHandler = useCallback(() => {
        userId && dispatch(getOrdersList(null));
        console.log('request order because loadOrder button is click');
    },[dispatch, userId]);

    const onOrderPanelSettingsClickHandler = useCallback(()=>{
        setIsOrderPageSettingsSideBarShow(prev => !prev);
    },[]);

    const onClickHandler = useCallback(() => {
        setIsNewOrderModalOpen(true);
    },[]);

    useInitialEffect(()=>{
        userId && dispatch(initOrdersPage(searchParams));
        dispatch(ordersPageSliceActions.setOrderPageTableActiveKeys(localStorageOrderTableKeys ? JSON.parse(localStorageOrderTableKeys) : orderTabHeaderKeysArr));
    });

    useEffect(()=>{
        console.log('request order because orderPageUseEffect is execute (dependencies: sortOrder, sortField, dispatch, userId, yearOfExecutionValue, orderStatusBoxValues)');
        userId && sortOrder && sortField && yearOfExecutionValue && orderStatusBoxValues && dispatch(getOrdersList(null));
    },[sortOrder, sortField, dispatch, userId, yearOfExecutionValue, orderStatusBoxValues]);

    console.log(ordersList);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack className={cls.layout}>
                <OrderPageToolsPanel
                    addOrderCallback={onClickHandler}
                    refreshOrdersCallback={onLoadClickHandler}
                    orderPanelSettingsClickCallback={onOrderPanelSettingsClickHandler}
                />
                <Page data-testid={'OrdersPage'} className={classNames(cls.OrdersPage, {}, [className])}>
                    <VStack align={'start'} gap={'16px'}>
                        {ordersList &&
                            <OrdersPageTable
                                orders={ordersList}
                            />
                        }
                        <AddNewOrderModal isOpen={isNewOrderModalOpen} onClose={onModalClose}/>
                    </VStack>
                </Page>
                <OrderPageSettingsSideBar show={isOrderPageSettingsSideBarShow} onClose={onOrderPanelSettingsClickHandler}/>
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(OrdersPage);
