import cls from './ExecutionsInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getOrderFormExecutions } from '../../model/selectors/getOrderFormExecutions/getOrderFormExecutions';
import { createExecution } from '../../model/services/createExecution/createExecution';
import { getOrderId } from '../../model/selectors/getOrderId/getOrderId';
import { ExecutionCard } from '../ExecutionCard/ExecutionCard';
import { HStack } from '@/shared/ui/Stack';

interface ExecutionsInformationProps {
    className?: string
}

export const ExecutionsInformation = memo((props: ExecutionsInformationProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const executions = useSelector(getOrderFormExecutions);
    const orderId = useSelector(getOrderId);

    const addExecution = useCallback(()=> {
        orderId && dispatch(createExecution(orderId));
    },[dispatch, orderId]);

    return (
        <div className={classNames(cls.ExecutionsInformation, {}, [className])}>
            <HStack gap={'8px'}>
                <h4>Выполнения</h4>
                <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.CLEAR} onClick={addExecution}>Add Execution</Button>
            </HStack>
            <HStack gap={'12px'} wrap={'wrap'}>
                {executions && executions?.length > 0
                    ? executions?.map(ex=><ExecutionCard key={ex._id} execution={ex}/>)
                    : <div>Выполнения для данного заказа отсутствуют</div>
                }
            </HStack>
        </div>
    );
});

ExecutionsInformation.displayName = 'ExecutionsInformation';