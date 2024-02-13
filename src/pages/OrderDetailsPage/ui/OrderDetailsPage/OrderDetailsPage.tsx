import cls from './OrderDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { EditableCard } from '@/features/editableCard';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchOrderById,
    getOrderDetailIsLoading, getOrderDetailsEditMode,
    orderDetailsSliceActions,
    orderDetailsSliceReducer, updateOrderById
} from '@/entities/Order';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useNavigate, useParams } from 'react-router-dom';
import { getRouteOrders } from '@/shared/const/router';
import { useSelector } from 'react-redux';
import { deleteOrderById } from '@/entities/Order';
import { OrderCard } from '@/entities/Order';
import { OrderDetailsPageToolPanel } from '../OrderDetailsPageToolPanel/OrderDetailsPageToolPanel';

interface OrderDetailsPageProps {
    className?: string
}

const OrderDetailsPage = memo((props: OrderDetailsPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { orderId } = useParams();
    const navigate = useNavigate();
    const isLoading = useSelector(getOrderDetailIsLoading);
    const editMode = useSelector(getOrderDetailsEditMode);

    useInitialEffect(()=>{
        orderId && dispatch(fetchOrderById(orderId));
    });

    const reducer: ReducerList = {
        orderDetails: orderDetailsSliceReducer
    };

    const onBackClickHandler = useCallback(() => {
        navigate(getRouteOrders());
    }, [navigate]);
    const onEditClickHandler = useCallback(() => {
        dispatch(orderDetailsSliceActions.setEditMode(true));
    }, [dispatch]);
    const onDeleteClickHandler = useCallback(() => {
        orderId && dispatch(deleteOrderById(orderId)).then((res)=>{
            if (res.payload !== 'error'){
                navigate(getRouteOrders());
            } else {
                //TODO implement error messages
                console.log(res.payload);
            }
        });
    }, [dispatch, navigate, orderId]);
    const onSaveClickHandler = useCallback(() => {
        orderId && dispatch(updateOrderById(orderId));
    }, [dispatch, orderId]);
    const onCancelClickHandler = useCallback(() => {
        dispatch(orderDetailsSliceActions.setEditMode(false));
        dispatch(orderDetailsSliceActions.rollBackForm());
    }, [dispatch]);


    return (
        <VStack className={cls.layout}>
            <OrderDetailsPageToolPanel
                onBackClick={onBackClickHandler}
                onEditClick={onEditClickHandler}
                onDeleteClick={onDeleteClickHandler}
                onSaveClick={onSaveClickHandler}
                onCancelClick={onCancelClickHandler}
                editMode={editMode}
            />
            <Page className={classNames(cls.OrderDetailsPage, {}, [className])}>
                <VStack gap={'16px'} max={true} >
                    <EditableCard
                        reducer={reducer}
                        removeAfterUnmount={true}
                        isLoading={isLoading}
                    >
                        <OrderCard newCard={true}/>
                    </EditableCard>
                </VStack>
            </Page>
        </VStack>
    );
});

OrderDetailsPage.displayName = 'OrderDetailsPage';

export default OrderDetailsPage;
