import cls from './OrderCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
// import { OrderInformation } from '../OrderInformation/OrderInformation';
import { OrderMaterials } from '../OrderMaterials/OrderMaterials';
import { BaseOrderInformation } from '../BaseOrderInformation/BaseOrderInformation';
import { CorrectionsInformation } from '../CorrectionsInformation/CorrectionsInformation';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';
import { ExecutionStatus, OrderDocumentsStatus, OrderStatus } from '@/shared/const/orderConsts';
import { ExecutionsInformation } from '../ExecutionsInformation/ExecutionsInformation';



interface OrderCardProps {
    className?: string,
    canEdit?: boolean,
    newCard?: boolean
}

export const OrderCard = memo((props: OrderCardProps) => {
    const { className, newCard } = props;

    const mockData = {
        _id: '_orderID',
        userId: 'userId',
        modified: 'modified',
        orderId: 'orderId',
        description: 'orderDescription',
        orderType: 'independent' as OrderType,
        orderExecutionType: 'planned' as OrderExecutionType,
        yearOfExecution: 'yearOfExecution',
        orderStatus: 'waiting_for_request' as OrderStatus,
        materialCorrections: [
            {
                value: 'materialCorrection1Value(ID)',
                status: OrderDocumentsStatus.WAITING_FOR_EC,
                _orderId: '_orderId',
                _id: '_materialCorrection1Id'
            },
            {
                value: 'materialCorrection2Value(ID)',
                status: OrderDocumentsStatus.WAITING_FOR_EC,
                _orderId: '_orderId',
                _id: '_materialCorrection2Id'
            },
            {
                value: 'materialCorrection3Value(ID)',
                status: OrderDocumentsStatus.WAITING_FOR_EC,
                _orderId: '_orderId',
                _id: '_materialCorrection3Id'
            }
        ],
        consignmentNotes: [
            {
                value: 'consignmentNote1Value(ID)',
                status: OrderDocumentsStatus.WAITING_FOR_EC,
                _orderId: '_orderId',
                _id: '_consignmentNote1Id',
            },
            {
                value: 'consignmentNote2Value(ID)',
                status: OrderDocumentsStatus.AWAITING_SIGNING,
                _orderId: '_orderId',
                _id: '_consignmentNote12d',
            }
        ],
        executions: [
            {
                value: 'execution1Value(ID)',
                status: ExecutionStatus.EXECUTING,
                _orderId: '_orderId',
                _id: '_execution1Id',
            }
        ],
        KS2Documents: [
            {
                value: 'KS2DocumentsValue(ID)',
                status: OrderDocumentsStatus.READY_TO_TRANSFER,
                _executionId: '_execution1Id',
                _id: '_KS2Document1Id'
            }
        ],
        writeOffDocuments: [
            {
                value: 'writeOffDocumentVALUE(ID)',
                status: OrderDocumentsStatus.READY_TO_TRANSFER,
                _executionId: '_execution1Id',
                _id: '_writeOffDocument1Id'
            }
        ],
        materials: []
    };


    if (newCard){
        return (
            <>
                <HStack gap={'16px'} justify={'start'} align={'start'} className={classNames(cls.OrderCard, {}, [className])}>
                    <VStack max gap={'20px'} justify={'start'} align={'center'} >
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