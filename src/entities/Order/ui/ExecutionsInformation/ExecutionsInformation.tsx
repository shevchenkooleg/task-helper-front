import cls from './ExecutionsInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getOrderFormExecutions } from '../../model/selectors/getOrderFormExecutions/getOrderFormExecutions';
import { getOrderId } from '../../model/selectors/getOrderId/getOrderId';
import { ExecutionCard } from '../ExecutionCard/ExecutionCard';
import { HStack, VStack } from '@/shared/ui/Stack';
import { createInnerDocument } from '../../model/services/createInnerDocument/createInnerDocument';
import { getOrderFormKS2 } from '../../model/selectors/getOrderFormKS2/getOrderFormKS2';
import { getWriteOffDocuments } from '../../model/selectors/getWriteOffDocuments/getWriteOffDocuments';
import { Card } from '@/shared/ui/Card';

interface ExecutionsInformationProps {
    className?: string
}

export const ExecutionsInformation = memo((props: ExecutionsInformationProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const executions = useSelector(getOrderFormExecutions);
    const KS2 = useSelector(getOrderFormKS2);
    const writeOffDocuments = useSelector(getWriteOffDocuments);
    const orderId = useSelector(getOrderId);

    const addExecution = useCallback(()=> {
        orderId && dispatch(createInnerDocument({ orderId, operationType: 'createExecution' }));
    },[dispatch, orderId]);

    return (
        <div className={classNames(cls.ExecutionsInformation, {}, [className])}>
            <HStack gap={'8px'} justify={'between'}>
                <h4 className={cls.title}>Выполнения</h4>
                <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.BACKGROUND_GREEN} rounded onClick={addExecution}>Add Execution</Button>
            </HStack>
            <VStack gap={'12px'} wrap={'wrap'}>
                {executions && executions?.length > 0
                    ? executions?.map(
                        ex=>
                            <Card key={ex._id} max>
                                <ExecutionCard
                                    execution={ex}
                                    KS2={KS2?.filter(document => document._executionId === ex._id)}
                                    writeOffDocuments={writeOffDocuments?.filter(document => document._executionId === ex._id)}
                                />
                            </Card>
                    )
                    : <div>Выполнения для данного заказа отсутствуют</div>
                }
            </VStack>
        </div>
    );
});

ExecutionsInformation.displayName = 'ExecutionsInformation';