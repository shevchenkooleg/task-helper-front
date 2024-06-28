import cls from './OrderCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { OrderMaterials } from '../OrderMaterials/OrderMaterials';
import { BaseOrderInformation } from '../BaseOrderInformation/BaseOrderInformation';
import { CorrectionsInformation } from '../CorrectionsInformation/CorrectionsInformation';
import { ExecutionsInformation } from '../ExecutionsInformation/ExecutionsInformation';
import { OrderDetailsCardView } from '@/shared/const/orderDetailsConsts';


interface OrderCardProps {
    className?: string,
    canEdit?: boolean,
    view?: OrderDetailsCardView
    onDeleteModalOpen?: (newValue: boolean)=>void
}

export const OrderCard = memo((props: OrderCardProps) => {
    const { className , view = OrderDetailsCardView.BASE, onDeleteModalOpen } = props;


    return (
        <VStack max={true} className={classNames(cls.OrderCard, {}, [className])}>
            {view === OrderDetailsCardView.BASE && <BaseOrderInformation onDeleteModalOpen={onDeleteModalOpen}/>}
            {view === OrderDetailsCardView.CORRECTIONS && <CorrectionsInformation/>}
            {view === OrderDetailsCardView.EXECUTIONS && <ExecutionsInformation/>}
            {view === OrderDetailsCardView.MATERIAL && <OrderMaterials/>}
        </VStack>
    );
});

OrderCard.displayName = 'OrderCard';