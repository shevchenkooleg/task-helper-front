import cls from './CorrectionsInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { useSelector } from 'react-redux';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    createMaterialCorrection
} from '../../model/services/createMaterialCorretion/createMaterialCorretion';
import { MaterialDataCard } from '../MaterialDataCard/MaterialDataCard';
import { orderDetailsSliceActions } from '../../model/slice/orderDetailsSlice';
import { OrderDocumentsStatus } from '@/shared/const/orderConsts';
import { createConsignmentNote } from '../../model/services/createConsignmentNote/createConsignmentNote';
import {
    deleteMaterialCorrection
} from '../../model/services/deleteMaterialCorrection/deleteMaterialCorrection';
import { deleteConsignmentNote } from '../../model/services/deleteConsignmentNote/deleteConsignmentNote';

interface CorrectionsInformationProps {
    className?: string
}
// TODO implement an correctionCard and an consignmentNoteCard

export const CorrectionsInformation = memo((props: CorrectionsInformationProps) => {
    const { className } = props;
    const orderFormData = useSelector(getOrderFormData);
    const dispatch = useAppDispatch();

    const addMaterialCorrection = useCallback(()=>{
        orderFormData?._id && dispatch(createMaterialCorrection(orderFormData?._id));
    },[dispatch, orderFormData?._id]);
    const addConsignmentNotes = useCallback(()=>{
        orderFormData?._id && dispatch(createConsignmentNote(orderFormData?._id));
    },[dispatch, orderFormData?._id]);
    const onMaterialCorrectionDelete = useCallback((correctionId: string)=>{
        dispatch(deleteMaterialCorrection({ orderId: orderFormData?._id ?? '', correctionId }));
    },[dispatch, orderFormData?._id]);
    const onConsignmentNotesDelete = useCallback((consignmentNoteId: string)=>{
        dispatch(deleteConsignmentNote({ orderId: orderFormData?._id ?? '', consignmentNoteId }));
    },[dispatch, orderFormData?._id]);
    const onChangeMaterialCorrection = useCallback((value?: string, status?: OrderDocumentsStatus)=>{
        dispatch(orderDetailsSliceActions.updateOrderForm({
            // materialCorrections: { value: value || '', status: status || OrderDocumentsStatus.ON_CLEARANCE }
        }));
    },[dispatch]);



    return (
        <div className={classNames(cls.CorrectionsInformation, {}, [className])}>
            <h4>Движение материалов</h4>
            <VStack align={'start'} gap={'16px'}>
                <VStack align={'start'}>
                    <HStack>
                        <div>Корректировки назначения:</div>
                        <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.CLEAR} onClick={addMaterialCorrection}>Add Correction</Button>
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
                        <div>Накладные М11:</div>
                        <Button size={ButtonSize.SIZE_S} theme={ButtonTheme.CLEAR} onClick={addConsignmentNotes}>Add M11</Button>
                    </HStack>

                    {
                        orderFormData?.consignmentNotes && orderFormData?.consignmentNotes?.length > 0
                            ? <VStack gap={'8px'}>
                                {orderFormData?.consignmentNotes?.map(note=>(
                                    <MaterialDataCard
                                        data={note}
                                        key={note._id}
                                        onChangeMaterialCorrection={onChangeMaterialCorrection}
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