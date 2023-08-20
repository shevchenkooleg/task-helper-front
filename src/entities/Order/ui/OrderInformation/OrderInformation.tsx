import cls from './OrderInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Input } from '@/shared/ui/Input';
import { timeConverter } from '@/shared/lib/timeConverter/timeConverter';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { HStack, VStack } from '@/shared/ui/Stack';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { orderDetailsSliceActions } from '../../model/slice/orderDetailsSlice';
import { BillOfQuantitiesStatus, OrderDocumentsStatus, OrderStatus } from '../../../../shared/const/orderConsts';
import { OrderStatusSelect } from '../OrderStatusSelect/OrderStatusSelect';
import { BillOfQuantitiesStatusSelect } from '../BillOfQuantitiesStatusSelect/BillOfQuantitiesStatusSelect';
import { OrderDocumentsStatusSelect } from '../OrderDocumentsStatusSelect/OrderDocumentsStatusSelect';

interface OrderInformationProps {
    className?: string
}

export const OrderInformation = memo((props: OrderInformationProps) => {
    const { className } = props;
    const form = useSelector(getOrderFormData);
    const dispatch = useAppDispatch();
    const editMode = !useSelector(getOrderDetailsEditMode);

    const onChangeExecuteId = useCallback((value?: string) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            executeId: value || ''
        }));
    }, [dispatch]);
    const onChangeDescription = useCallback((value?: string) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            description: value || ''
        }));
    }, [dispatch]);
    const onChangeOrderStatus = useCallback((value?: OrderStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            orderStatus: value || OrderStatus.NONE
        }));
    }, [dispatch]);






    const onChangeCorrectionId = useCallback((value?: string, status?: OrderDocumentsStatus) => {
        console.log('value: ',value);
        console.log('status: ',status);
        dispatch(orderDetailsSliceActions.updateOrderForm({
            correctionId: { value: value || '', status: status || OrderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);










    const onChangeConsignmentNoteId = useCallback((value?: string, status?: OrderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            consignmentNoteId: { value: value || '', status: status || OrderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);
    const onChangeBillOfQuantities = useCallback((value?: BillOfQuantitiesStatus, status?: OrderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            billOfQuantities: { value: value || BillOfQuantitiesStatus.NOT_LOADED, status: status || OrderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);
    const onChangeKS2Id = useCallback((value?: string, status?: OrderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            KS2Id: { value: value || '', status: status || OrderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);
    const onChangeWriteOffActId = useCallback((value?: string, status?: OrderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            writeOffActId: { value: value || '', status: status || OrderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);
    const onChangeYearOfExecution = useCallback((value?: string) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            yearOfExecution: value || ''
        }));
    }, [dispatch]);


    return (
        <>
            <div>Информация о заказе</div>
            <VStack max align={'start'} gap={'16px'} className={classNames(cls.OrderInformation, {}, [className])}>
                <Input
                    readOnly={true} placeholder={'Номер заказа:'}
                    value={form?.orderId}
                />

                <Input
                    readOnly={editMode}
                    placeholder={'Номер выполнения:'}
                    value={form?.executeId}
                    onChange={onChangeExecuteId}
                />

                <Input
                    readOnly={editMode}
                    placeholder={'Оборудование:'}
                    value={form?.description}
                    onChange={onChangeDescription}
                />

                <OrderStatusSelect
                    readOnly={editMode}
                    value={form?.orderStatus}
                    onChange={onChangeOrderStatus}
                />

                <HStack gap={'32px'} justify={'between'} max>
                    <Input
                        readOnly={editMode}
                        placeholder={'Номер корректировки:'}
                        value={form?.correctionId?.value}
                        onChange={
                            (value: string)=>{
                                onChangeCorrectionId(value, form?.correctionId?.status);
                            }
                        }
                    />
                    <OrderDocumentsStatusSelect
                        readOnly={editMode}
                        value={form?.correctionId?.status}
                        onChange={
                            (status: OrderDocumentsStatus)=>{
                                onChangeCorrectionId(form?.correctionId?.value, status);
                            }
                        }
                    />
                </HStack>
                <HStack gap={'32px'} justify={'between'} max>
                    <Input
                        readOnly={editMode}
                        placeholder={'Номер накладной М11:'}
                        value={form?.consignmentNoteId?.value}
                        onChange={
                            (value: string)=>{
                                onChangeConsignmentNoteId(value, form?.consignmentNoteId?.status);
                            }
                        }
                    />
                    <OrderDocumentsStatusSelect
                        readOnly={editMode}
                        value={form?.consignmentNoteId?.status}
                        onChange={
                            (status: OrderDocumentsStatus)=>{
                                onChangeConsignmentNoteId(form?.consignmentNoteId?.value, status);
                            }
                        }
                    />
                </HStack>
                <HStack gap={'32px'} justify={'between'} max>
                    <BillOfQuantitiesStatusSelect
                        readOnly={editMode}
                        value={form?.billOfQuantities?.value}
                        onChange={
                            (value: BillOfQuantitiesStatus)=>{
                                onChangeBillOfQuantities(value, form?.billOfQuantities?.status);
                            }
                        }
                    />
                    <OrderDocumentsStatusSelect
                        readOnly={editMode}
                        value={form?.billOfQuantities?.status}
                        onChange={
                            (status: OrderDocumentsStatus)=>{
                                onChangeBillOfQuantities(form?.billOfQuantities?.value, status);
                            }
                        }
                    />
                </HStack>
                <HStack gap={'32px'} justify={'between'} max>
                    <Input
                        readOnly={editMode}
                        placeholder={'Номер КС-2:'}
                        value={form?.KS2Id?.value}
                        onChange={
                            (value: string)=>{
                                onChangeKS2Id(value, form?.KS2Id?.status);
                            }
                        }
                    />
                    <OrderDocumentsStatusSelect
                        readOnly={editMode}
                        value={form?.KS2Id?.status}
                        onChange={
                            (status: OrderDocumentsStatus)=>{
                                onChangeKS2Id(form?.KS2Id?.value, status);
                            }
                        }
                    />
                </HStack>
                <HStack gap={'32px'} justify={'between'} max>
                    <Input
                        readOnly={editMode}
                        placeholder={'Номер акта на списание:'}
                        value={form?.writeOffActId?.value}
                        onChange={
                            (value: string)=>{
                                onChangeWriteOffActId(value, form?.writeOffActId?.status);
                            }
                        }
                    />
                    <OrderDocumentsStatusSelect
                        readOnly={editMode}
                        value={form?.writeOffActId?.status}
                        onChange={
                            (status: OrderDocumentsStatus)=>{
                                onChangeWriteOffActId(form?.writeOffActId?.value, status);
                            }
                        }
                    />
                </HStack>
                <Input
                    readOnly={editMode}
                    placeholder={'Год выполнения:'}
                    value={form?.yearOfExecution}
                    onChange={onChangeYearOfExecution}
                />

                <Input
                    readOnly={true}
                    placeholder={'Последнее изменение:'}
                    value={timeConverter(form?.modified ? form.modified : '')}
                />
            </VStack>
        </>
    );
});

OrderInformation.displayName = 'OrderInformation';