import cls from './CorrectionsInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { useSelector } from 'react-redux';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';


import { MaterialDataCard } from '../MaterialDataCard/MaterialDataCard';
import { orderDetailsSliceActions } from '../../model/slice/orderDetailsSlice';


import {
    OrderConsignmentNoteInterface,
    OrderMaterialCorrectionInterface
} from '../../model/types/orderDetailsSliceSchema';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { createInnerDocument } from '../../model/services/createInnerDocument/createInnerDocument';
import { deleteInnerDocument } from '../../model/services/deleteInnerDocument/deleteInnerDocument';

interface CorrectionsInformationProps {
    className?: string
}
// TODO implement an correctionCard and an consignmentNoteCard

export const CorrectionsInformation = memo((props: CorrectionsInformationProps) => {
    const { className } = props;
    const orderFormData = useSelector(getOrderFormData);
    const dispatch = useAppDispatch();
    const editMode = useSelector(getOrderDetailsEditMode);

    const addMaterialCorrection = useCallback(()=>{
        orderFormData?._id && dispatch(createInnerDocument({ orderId: orderFormData?._id, operationType: 'createCorrection' }));
    },[dispatch, orderFormData?._id]);
    const addConsignmentNotes = useCallback(()=>{
        orderFormData?._id && dispatch(createInnerDocument({ orderId: orderFormData?._id, operationType: 'createConsignment' }));
    },[dispatch, orderFormData?._id]);
    const onMaterialCorrectionDelete = useCallback((correctionId: string)=>{
        dispatch(deleteInnerDocument({ orderId: orderFormData?._id ?? '', operationType: 'deleteCorrection',  documentId:correctionId }));
    },[dispatch, orderFormData?._id]);
    const onConsignmentNotesDelete = useCallback((consignmentNoteId: string)=>{
        dispatch(deleteInnerDocument({ orderId: orderFormData?._id ?? '',operationType: 'deleteConsignment',  documentId:consignmentNoteId }));
    },[dispatch, orderFormData?._id]);
    const onChangeMaterialCorrection = useCallback((correctionId: string, newCorrection: OrderMaterialCorrectionInterface)=>{
        dispatch(orderDetailsSliceActions.updateOrderFormCorrection({
            correctionId: correctionId,
            correction: newCorrection
        }));
    },[dispatch]);
    const onChangeConsignmentNote = useCallback((consignmentNoteId: string, newConsignmentNote: OrderConsignmentNoteInterface)=>{
        dispatch(orderDetailsSliceActions.updateOrderConsignmentNote({
            consignmentNoteId: consignmentNoteId,
            consignmentNote: newConsignmentNote
        }));
    },[dispatch]);



    return (
        <div className={classNames(cls.CorrectionsInformation, {}, [className])}>
            <h4>Движение материалов</h4>
            <VStack align={'start'} gap={'16px'}>
                <VStack align={'start'}>
                    <HStack>
                        <div className={cls.title}>Корректировки назначения:</div>
                        {editMode && <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.CLEAR} onClick={addMaterialCorrection}>Add Correction</Button>}
                    </HStack>
                    {
                        orderFormData?.materialCorrections && orderFormData?.materialCorrections?.length > 0
                            ? <VStack gap={'8px'}>
                                {orderFormData?.materialCorrections?.map(correction=>(
                                    <MaterialDataCard
                                        data={correction}
                                        key={correction._id}
                                        onChangeMaterialCorrection={onChangeMaterialCorrection}
                                        onDeleteClick={()=>onMaterialCorrectionDelete(correction._id)}
                                    />
                                ))}
                            </VStack>
                            : <HStack gap={'32px'}>
                                Корректировки отсутствуют
                            </HStack>
                    }
                </VStack>
                <VStack align={'start'}>
                    <HStack>
                        <div className={cls.title}>Накладные М11:</div>
                        {editMode && <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.CLEAR} onClick={addConsignmentNotes}>Add M11</Button>}
                    </HStack>

                    {
                        orderFormData?.consignmentNotes && orderFormData?.consignmentNotes?.length > 0
                            ? <VStack gap={'8px'}>
                                {orderFormData?.consignmentNotes?.map(note=>(
                                    <MaterialDataCard
                                        data={note}
                                        key={note._id}
                                        onChangeMaterialCorrection={onChangeConsignmentNote}
                                        onDeleteClick={()=>onConsignmentNotesDelete(note._id)}
                                    />
                                ))}
                            </VStack>
                            : <HStack gap={'32px'}>
                                Накладные М11 отсутствуют
                            </HStack>
                    }

                </VStack>
            </VStack>
        </div>
    );
});

CorrectionsInformation.displayName = 'CorrectionsInformation';