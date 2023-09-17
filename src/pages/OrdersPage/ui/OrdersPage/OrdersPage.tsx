import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './OrdersPage.module.scss';
import { memo, useCallback, useEffect, useState } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ordersPageSliceReducer } from '../../model/slice/ordersPageSlice';
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
    getOrderListFiltersSortOrder,
    orderListFiltersSliceReducer
} from '@/features/orderListFilters';
import { useSearchParams } from 'react-router-dom';
import { initOrdersPage } from '../../model/services/initOrdersPage';

interface OrdersPageProps {
    className?: string
}

const OrdersPage = (props: OrdersPageProps) => {
    const { className } = props;
    const userId = useSelector(getUserAuthData);
    const ordersList = useSelector(getOrderListSelector);
    const sortOrder = useSelector(getOrderListFiltersSortOrder);
    const sortField = useSelector(getOrderListFilterField);
    const reducers: ReducerList = {
        orders: ordersPageSliceReducer,
        orderFilters: orderListFiltersSliceReducer
    };
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    console.log(searchParams);

    const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
    const onModalClose = useCallback(() => {
        dispatch(getOrdersList(null));
        setIsNewOrderModalOpen(false);
    },[dispatch]);

    const onLoadClickHandler = useCallback(() => {
        userId && dispatch(getOrdersList(null));
    },[dispatch, userId]);

    const onClickHandler = useCallback(() => {
        setIsNewOrderModalOpen(true);
    },[]);

    useInitialEffect(()=>{
        userId && dispatch(initOrdersPage(searchParams));
    });

    useEffect(()=>{
        userId && sortOrder && sortField && dispatch(getOrdersList(null));
    },[sortOrder, sortField, dispatch, userId]);


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <VStack className={cls.layout}>
                <OrderPageToolsPanel
                    addOrderCallback={onClickHandler}
                    refreshOrdersCallback={onLoadClickHandler}
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
            </VStack>
        </DynamicModuleLoader>
    );
};

export default memo(OrdersPage);