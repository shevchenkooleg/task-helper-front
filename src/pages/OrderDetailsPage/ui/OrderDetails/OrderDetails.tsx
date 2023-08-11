import cls from './OrderDetails.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation, useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { orderDetailsSliceReducer } from '@/entities/Order';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface OrderDetailsProps {
    className?: string
}

export const OrderDetails = memo((props: OrderDetailsProps) => {
    const { className } = props;
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { orderId } = useParams<{orderId: string}>();
    console.log(orderId);
    console.log(location);

    // useInitialEffect(()=>{
    //     dispatch(fetchOrderById(orderId));
    // });

    const reducer: ReducerList = {
        orderDetails: orderDetailsSliceReducer
    };

    useInitialEffect(()=>{
        console.log('init');
        // orderId && dispatch(fetchOrderById(orderId));
    });



    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={true}>
            <div className={classNames(cls.OrderDetails, {}, [className])}>
                OrderDetails
            </div>
        </DynamicModuleLoader>
    );
});

OrderDetails.displayName = 'OrderDetails';