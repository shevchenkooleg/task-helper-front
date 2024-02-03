import cls from './ExecutionsInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getOrderFormExecutions } from '../../model/selectors/getOrderFormExecutions/getOrderFormExecutions';
import { getOrderId } from '../../model/selectors/getOrderId/getOrderId';
import { ExecutionCard } from '../ExecutionCard/ExecutionCard';
import { HStack } from '@/shared/ui/Stack';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { createInnerDocument } from '../../model/services/createInnerDocument/createInnerDocument';
import { getOrderFormKS2 } from '../../model/selectors/getOrderFormKS2/getOrderFormKS2';

interface ExecutionsInformationProps {
    className?: string
}

export const ExecutionsInformation = memo((props: ExecutionsInformationProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const executions = useSelector(getOrderFormExecutions);
    const KS2 = useSelector(getOrderFormKS2);
    const orderId = useSelector(getOrderId);
    const editMode = useSelector(getOrderDetailsEditMode);

    const addExecution = useCallback(()=> {
        orderId && dispatch(createInnerDocument({ orderId, operationType: 'createExecution' }));
    },[dispatch, orderId]);

    return (
        <div className={classNames(cls.ExecutionsInformation, {}, [className])}>
            <HStack gap={'8px'}>
                <h4 className={cls.title}>Выполнения</h4>
                {editMode && <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.CLEAR} onClick={addExecution}>Add Execution</Button>}
            </HStack>
            <HStack gap={'12px'} wrap={'wrap'}>
                {executions && executions?.length > 0
                    ? executions?.map(ex=><ExecutionCard key={ex._id} execution={ex} KS2={KS2?.filter(document => document._executionId === ex._id)}/>)
                    : <div>Выполнения для данного заказа отсутствуют</div>
                }
            </HStack>
        </div>
    );
});

ExecutionsInformation.displayName = 'ExecutionsInformation';