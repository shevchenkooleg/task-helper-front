import cls from './ExecutionCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign } from '@/shared/ui/Text';
import {
    KS2DocumentInterface,
    OrderExecutionInterface,
    WriteOffDocumentInterface
} from '../../model/types/orderDetailsSliceSchema';
import { Input } from '@/shared/ui/Input';
import { ListBox } from '@/shared/ui/Popups';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { orderDetailsSlice, orderDetailsSliceActions } from '../../model/slice/orderDetailsSlice';
import { deleteInnerDocument } from '../../model/services/deleteInnerDocument/deleteInnerDocument';
import { createInnerDocument } from '../../model/services/createInnerDocument/createInnerDocument';
import { ExecutionDataCard } from '../ExecutionDataCard/ExecutionDataCard';
import { getOrderId } from '../../model/selectors/getOrderId/getOrderId';
import { ExecutionStatus, OrderStatus, orderStatusMapper } from '@/shared/const/orderConsts';
import { orderExecutionStatusOption } from '@/shared/const/orderDetailsConsts';

interface ExecutionCardProps {
    className?: string
    execution?: OrderExecutionInterface
    KS2?: Array<KS2DocumentInterface>
    writeOffDocuments?: Array<WriteOffDocumentInterface>
}

export const ExecutionCard = memo((props: ExecutionCardProps) => {
    const { className, execution, KS2, writeOffDocuments } = props;
    const orderId = useSelector(getOrderId);
    const editMode = useSelector(getOrderDetailsEditMode);
    const dispatch = useAppDispatch();

    const orderExecutionStatusValue = execution?.status ?? OrderStatus.ISSUED;


    const onDeleteClickHandler = useCallback(() => {
        execution &&  dispatch(deleteInnerDocument({ orderId: execution?._orderId, operationType: 'deleteExecution', documentId: execution?._id }));
    },[dispatch, execution]);

    const onChangeExecuteId = useCallback((newValue?: string) => {
        execution && dispatch(orderDetailsSliceActions.updateOrderFormExecution({
            executionId: execution?._id,
            execution: { ...execution, value: newValue ?? '' }
        }));
    }, [dispatch, execution]);

    const onExecutingStatusChange = useCallback((newStatus: ExecutionStatus)=>{
        execution && dispatch(orderDetailsSliceActions.updateOrderFormExecution({
            executionId: execution?._id,
            execution: { ...execution, status: newStatus ?? ExecutionStatus.EXECUTING }
        }));
    },[dispatch, execution]);

    const addKS2 = useCallback(()=>{
        dispatch(createInnerDocument({ orderId: execution?._orderId ?? '' ,operationType: 'createKS2', correctionId: execution?._id }));
    },[dispatch, execution?._id, execution?._orderId]);

    const addWriteOffDocument = useCallback(()=>{
        dispatch(createInnerDocument({ orderId: execution?._orderId ?? '' ,operationType: 'createWriteOffDocument', correctionId: execution?._id }));
    },[dispatch, execution?._id, execution?._orderId]);

    const onKS2Delete = useCallback((documentId: string)=>{
        orderId && dispatch(deleteInnerDocument({ orderId, operationType: 'deleteKS2', documentId: documentId }));
    },[dispatch, orderId]);

    const onWriteOffDocumentDelete = useCallback((documentId: string)=>{
        orderId && dispatch(deleteInnerDocument({ orderId, operationType: 'deleteWriteOffDocument', documentId: documentId }));
    },[dispatch, orderId]);

    const onChangeKS2DataCardValue = useCallback((newKS2: KS2DocumentInterface, KS2Id: string)=>{
        dispatch(orderDetailsSlice.actions.updateExecutionKS2Card({ KS2: newKS2, KS2Id }));
    },[dispatch]);

    const onChangeWriteOffDataCardValue = useCallback((newWriteOffDocument: WriteOffDocumentInterface, writeOffDocumentId: string)=>{
        dispatch(orderDetailsSlice.actions.updateExecutionWriteOffCard({ writeOffDocument: newWriteOffDocument, writeOffDocumentId }));
    },[dispatch]);

    return (

        <div className={classNames(cls.ExecutionCard, {}, [className])}>
            <HStack wrap={'wrap'} gap={'12px'} className={cls.card} justify={'center'}>
                <VStack align={'start'} gap={'24px'}>
                    <VStack align={'start'} gap={'8px'}>
                        <HStack gap={'12px'} justify={'between'} max={true}>
                            <Text text={'Основные данные'} align={TextAlign.START}/>
                            {
                                editMode && <Button
                                    size={ButtonSize.SIZE_XS}
                                    theme={ButtonTheme.OUTLINE_RED}
                                    square={true}
                                    onClick={onDeleteClickHandler}
                                >
                                X
                                </Button>
                            }
                        </HStack>
                        <HStack max={true} gap={'12px'} justify={'center'}>
                            <Text text={'№ выполнения'}/>
                            <Input
                                value={execution?.value}
                                readOnly={!editMode}
                                onChange={onChangeExecuteId}
                            />
                            <ListBox
                                readOnly={!editMode}
                                size={ButtonSize.SIZE_S}
                                value={orderStatusMapper[orderExecutionStatusValue]}
                                items={orderExecutionStatusOption}
                                onChange={(value: string)=>onExecutingStatusChange(value as ExecutionStatus)}
                            />
                        </HStack>
                    </VStack>
                    <VStack align={'start'} gap={'4px'} max={true}>
                        <HStack justify={'between'} max={true}>
                            <Text text={'Акты по форме КС-2'} align={TextAlign.START} className={cls.title}/>
                            {editMode && <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.CLEAR} onClick={addKS2}>Add Document</Button>}
                        </HStack>
                        {
                            KS2 && KS2?.length > 0
                                ? KS2.map((d)=>(
                                    <ExecutionDataCard
                                        key={d._id}
                                        data={d}
                                        onChangeExecutionDataCardValue={onChangeKS2DataCardValue}
                                        onDeleteClick={()=>onKS2Delete(d._id)}
                                    />
                                ))
                                : <div>Акты по форме КС-2 отсутствуют</div>
                        }
                    </VStack>
                    <VStack align={'start'} gap={'4px'} max={true}>
                        <HStack justify={'between'} max={true}>
                            <Text text={'Акты на списание'} align={TextAlign.START} className={cls.title}/>
                            {editMode && <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.CLEAR} onClick={addWriteOffDocument}>Add Document</Button>}
                        </HStack>

                        {
                            writeOffDocuments && writeOffDocuments?.length > 0
                                ? writeOffDocuments.map((d)=>(
                                    <ExecutionDataCard
                                        key={d._id}
                                        data={d}
                                        onChangeExecutionDataCardValue={onChangeWriteOffDataCardValue}
                                        onDeleteClick={()=>onWriteOffDocumentDelete(d._id)}
                                    />
                                ))
                                : <div>Акты на списание отсутствуют</div>
                        }
                    </VStack>
                </VStack>


            </HStack>
        </div>
    );
});

ExecutionCard.displayName = 'ExecutionCard';