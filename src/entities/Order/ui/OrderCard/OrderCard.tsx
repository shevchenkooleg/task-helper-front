import cls from './OrderCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
// import { OrderInformation } from '../OrderInformation/OrderInformation';
import { OrderMaterials } from '../OrderMaterials/OrderMaterials';
import { BaseOrderInformation } from '../BaseOrderInformation/BaseOrderInformation';
import { CorrectionsInformation } from '../CorrectionsInformation/CorrectionsInformation';
import { ExecutionsInformation } from '../ExecutionsInformation/ExecutionsInformation';



interface OrderCardProps {
    className?: string,
    canEdit?: boolean,
    newCard?: boolean
}

export const OrderCard = memo((props: OrderCardProps) => {
    const { className, newCard } = props;

    if (newCard){
        return (
            <>
                <HStack max={true} gap={'16px'} justify={'start'} align={'start'} className={classNames(cls.OrderCard, {}, [className])}>
                    <VStack max gap={'32px'} justify={'start'} align={'center'} >
                        <BaseOrderInformation/>
                        <CorrectionsInformation/>
                        <ExecutionsInformation/>
                    </VStack>
                    <OrderMaterials/>
                </HStack>
                {/*<VStack max gap={'16px'} justify={'start'} align={'center'} className={classNames(cls.OrderCard, {}, [className])}>*/}
                {/*    /!*<OrderInformation/>*!/*/}
                {/*    /!*<BoundaryLine/>*!/*/}
                {/*    /!*<OrderMaterials/>*!/*/}
                {/*</VStack>*/}
            </>
        );
    }

    return (
        <VStack max gap={'16px'} justify={'start'} align={'center'} className={classNames(cls.OrderCard, {}, [className])}>
            {/*<OrderInformation/>*/}
            {/*<BoundaryLine/>*/}
            {/*<OrderMaterials className={cls.OrderCardMaterialTable}/>*/}
        </VStack>
    );
});

OrderCard.displayName = 'OrderCard';