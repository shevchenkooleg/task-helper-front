import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './OrdersPage.module.scss';
import { memo, useState } from 'react';
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
import { fetchOrderById } from '@/entities/Order';

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
    const onModalClose = () => {
        dispatch(getOrdersList(null));
        setIsNewOrderModalOpen(false);
    };

    const onLoadClickHandler = () => {
        userId && dispatch(getOrdersList(null));
    };

    const onClickHandler = () => {
        setIsNewOrderModalOpen(true);
        // dispatch(addNewOrder({ orderId: 'qqq', description: 'www', userId: userId ?? '' }));
    };

    const onFetchClickHandler = () => {
        dispatch(fetchOrderById('64d39d48aaf15ef01c4293fa'));
    };


    useInitialEffect(()=>{
        userId && dispatch(getOrdersList(null));
    });

    console.log(ordersList);
    

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page data-testid={'OrdersPage'} className={classNames(cls.OrdersPage, {}, [className])}>
                <VStack align={'start'} gap={'16px'}>
                    <HStack gap={'32px'} justify={'between'}>
                        <div>Orders Filters block</div>
                        <Button onClick={onLoadClickHandler}>загрузить заказы</Button>
                        <Button onClick={onClickHandler}>добавить заказ</Button>
                        <Button onClick={onFetchClickHandler}>fetch order by Id</Button>
                    </HStack>
                    <OrdersPageTable orders={ordersList}/>
                    <AddNewOrderModal isOpen={isNewOrderModalOpen} onClose={onModalClose}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(OrdersPage);