import cls from './OrderCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { OrderInformation } from '../OrderInformation/OrderInformation';
import { OrderMaterials } from '../OrderMaterials/OrderMaterials';
import { BoundaryLine } from '@/shared/ui/BoundaryLine/BoundaryLine';

interface OrderCardProps {
    className?: string,
    canEdit?: boolean,
}

export const OrderCard = memo((props: OrderCardProps) => {
    const { className } = props;



    return (
        <VStack max gap={'16px'} justify={'start'} align={'center'} className={classNames(cls.OrderCard, {}, [className])}>
            <OrderInformation/>
            <BoundaryLine/>
            <OrderMaterials/>
        </VStack>
    );
});

OrderCard.displayName = 'OrderCard';