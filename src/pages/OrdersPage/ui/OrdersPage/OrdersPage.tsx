import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './OrdersPage.module.scss';
import { memo, useCallback, useState } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { ordersPageSliceReducer } from '../../model/slice/ordersPageSlice';
import { Button } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { getOrderListSelector, getOrdersList } from '@/features/getOrdersList';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { AddNewOrderModal } from '@/features/addNewOrder';
import { OrdersPageTable } from '../OrdersPageTable/OrdersPageTable';

interface OrdersPageProps {
    className?: string
}

const OrdersPage = (props: OrdersPageProps) => {
    const { className } = props;
    const userId = useSelector(getUserAuthData);
    const ordersList = useSelector(getOrderListSelector);
    const reducers: ReducerList = {
        orders: ordersPageSliceReducer
    };
    const dispatch = useAppDispatch();

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
        userId && dispatch(getOrdersList(null));
    });
    

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page data-testid={'OrdersPage'} className={classNames(cls.OrdersPage, {}, [className])}>
                <VStack align={'start'} gap={'16px'}>
                    <HStack gap={'32px'} justify={'between'} max>
                        <div>Orders Filters block</div>
                        <HStack gap={'32px'}>
                            <Button onClick={onLoadClickHandler}>обновить заказы</Button>
                            <Button onClick={onClickHandler}>добавить заказ</Button>
                        </HStack>
                    </HStack>
                    {ordersList && <OrdersPageTable orders={ordersList}/>}
                    <AddNewOrderModal isOpen={isNewOrderModalOpen} onClose={onModalClose}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(OrdersPage);