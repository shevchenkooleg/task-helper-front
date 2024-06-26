import cls from './OrderCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { OrderMaterials } from '../OrderMaterials/OrderMaterials';
import { BaseOrderInformation } from '../BaseOrderInformation/BaseOrderInformation';
import { CorrectionsInformation } from '../CorrectionsInformation/CorrectionsInformation';
import { ExecutionsInformation } from '../ExecutionsInformation/ExecutionsInformation';
import { OrderDetailsCardView } from '@/shared/const/orderDetailsConsts';


interface OrderCardProps {
    className?: string,
    canEdit?: boolean,
    newDesign?: boolean
    view?: OrderDetailsCardView

}

export const OrderCard = memo((props: OrderCardProps) => {
    const { className, newDesign , view = OrderDetailsCardView.BASE } = props;

    console.log(view === OrderDetailsCardView.CORRECTIONS);

    if (newDesign){
        return (
            <VStack max={true} className={classNames(cls.OrderCard, {}, [className])}>
                {view === OrderDetailsCardView.BASE && <BaseOrderInformation/>}
                {view === OrderDetailsCardView.CORRECTIONS && <CorrectionsInformation/>}
                {view === OrderDetailsCardView.EXECUTIONS && <ExecutionsInformation/>}
                {view === OrderDetailsCardView.MATERIAL && <OrderMaterials/>}
                {/*<VStack max gap={'16px'} justify={'start'} align={'center'} className={classNames(cls.OrderCard, {}, [className])}>*/}
                {/*    /!*<OrderInformation/>*!/*/}
                {/*    /!*<BoundaryLine/>*!/*/}
                {/*    /!*<OrderMaterials/>*!/*/}
                {/*</VStack>*/}
            </VStack>
        );
    }

    return (
        <>
            <HStack max={true} gap={'16px'} justify={'start'} align={'start'}
                className={classNames(cls.OrderCard, {}, [className])}>
                <VStack max gap={'32px'} justify={'start'} align={'center'} >
                    <BaseOrderInformation/>
                    <CorrectionsInformation/>
                    <ExecutionsInformation/>
                </VStack>
                <OrderMaterials/>
            </HStack>
        </>
    );
});

OrderCard.displayName = 'OrderCard';