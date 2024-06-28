import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './OrdersPage.module.scss';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import { OrdersSortField, orderTabHeaderKeysArr } from '@/shared/const/orderConsts';
import { GetOrdersListQueryParams } from '@/features/getOrdersList';

interface OrdersPageProps {
    className?: string
}

const OrdersPage = (props: OrdersPageProps) => {
    const { className } = props;
    const userId = useSelector(getUserAuthData);
    const ordersList = useSelector(getOrderListSelector);
    const sortOrder = useSelector(getOrderListFiltersSortOrder) ?? 'asc';
    const sortField = useSelector(getOrderListFilterField) ?? OrdersSortField.ORDER_ID;
    const yearOfExecutionValue = useSelector(getOrderListFiltersYearOfExecution) ?? 'any';
    const orderStatusBoxValues  = useSelector(getOrderStatusBoxValues);
    const getOrderListQueryParams: GetOrdersListQueryParams = useMemo(
        ()=>({ order: sortOrder, sort: sortField, yearOfExecution: yearOfExecutionValue }),
        [sortField, sortOrder, yearOfExecutionValue]
    );

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
        dispatch(getOrdersList(getOrderListQueryParams));
        setIsNewOrderModalOpen(false);
    },[dispatch, getOrderListQueryParams]);

    const onLoadClickHandler = useCallback(() => {
        userId && dispatch(getOrdersList(getOrderListQueryParams));
        console.log('request order because loadOrder button is click');
    },[dispatch, getOrderListQueryParams, userId]);

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
        userId && sortOrder && sortField && yearOfExecutionValue && orderStatusBoxValues && dispatch(getOrdersList(getOrderListQueryParams));
    },[sortOrder, sortField, dispatch, userId, yearOfExecutionValue, orderStatusBoxValues, getOrderListQueryParams]);

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
                {isOrderPageSettingsSideBarShow && <OrderPageSettingsSideBar show={isOrderPageSettingsSideBarShow} onClose={onOrderPanelSettingsClickHandler}/>}
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(OrdersPage);
