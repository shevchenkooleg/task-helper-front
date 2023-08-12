import { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchOrderById, orderDetailsSliceReducer } from '@/entities/Order';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { EditableOrderCardHeader } from '../EditableOrderCardHeader/EditableOrderCardHeader';
import { OrderCard } from '@/entities/Order';

interface EditableOrderCardProps {
    className?: string
}

export const EditableOrderCard = memo((props: EditableOrderCardProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { orderId } = useParams<{orderId: string}>();

    const reducer: ReducerList = {
        orderDetails: orderDetailsSliceReducer
    };

    useInitialEffect(()=>{
        orderId && dispatch(fetchOrderById(orderId));
    });

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={true}>
            <VStack gap={'8px'} max>
                <EditableOrderCardHeader orderId={orderId}/>
                <OrderCard/>
            </VStack>
        </DynamicModuleLoader>
    );
});

EditableOrderCard.displayName = 'EditableOrderCard';