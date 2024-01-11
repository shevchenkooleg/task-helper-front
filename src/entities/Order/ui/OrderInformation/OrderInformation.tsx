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
import { ListBox } from '@/shared/ui/Popups';
import {
    OrderExecutionType,
    orderExecutionTypeMapper,
    OrderType,
    orderTypeMapper
} from '@/shared/const/addNewOrderConsts';
import { orderExecutionTypeOptions, orderTypeOptions } from '@/shared/const/orderDetailsConsts';

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
    const onConsignmentNoteIdCheckboxClick = useCallback(() => {
        form?.consignmentNoteId?.value === 'отсутствует'
            ? dispatch(orderDetailsSliceActions.updateOrderForm({
                consignmentNoteId: { value: '', status: OrderDocumentsStatus.ON_CLEARANCE }
            }))
            : dispatch(orderDetailsSliceActions.updateOrderForm({
                consignmentNoteId: { value: 'отсутствует', status: OrderDocumentsStatus.UPLOADED_TO_TTS }
            }));
    },[dispatch, form?.consignmentNoteId?.value]);
    const onCorrectionIdCheckboxClick = useCallback(() => {
        form?.correctionId?.value === 'отсутствует'
            ? dispatch(orderDetailsSliceActions.updateOrderForm({
                correctionId: { value: '', status: OrderDocumentsStatus.ON_CLEARANCE }
            }))
            : dispatch(orderDetailsSliceActions.updateOrderForm({
                correctionId: { value: 'отсутствует', status: OrderDocumentsStatus.UPLOADED_TO_TTS }
            }));
    },[dispatch, form?.correctionId?.value]);
    const onChangeOrderType = useCallback((newType?: string) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            orderType: newType as OrderType || OrderType.INDEPENDENT
        }));
    }, [dispatch]);
    const onChangeOrderExecutionType = useCallback((newOrderExecutionType: string) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            orderExecutionType: newOrderExecutionType as OrderExecutionType || OrderExecutionType.PLANNED
        }));
    },[dispatch]);


    return (
        <>
            <div>Информация о заказе</div>
            <VStack max align={'start'} gap={'16px'} className={classNames(cls.OrderInformation, {}, [className])}>
                <HStack gap={'32px'}>
                    <Input
                        readOnly={true} placeholder={'Номер заказа:'}
                        value={form?.orderId}
                    />
                    <ListBox
                        onChange={onChangeOrderType}
                        value={form?.orderType && orderTypeMapper[form.orderType]}
                        items={orderTypeOptions}
                        readOnly={editMode}
                    />
                    <ListBox
                        onChange={onChangeOrderExecutionType}
                        value={form?.orderExecutionType && orderExecutionTypeMapper[form.orderExecutionType]}
                        items={orderExecutionTypeOptions}
                        readOnly={editMode}
                    />
                </HStack>
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
                    <HStack gap={'32px'}>
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
                        <HStack gap={'4px'}>
                            <Input
                                type={'checkbox'}
                                readOnly={editMode}
                                checked={form?.correctionId?.value === 'отсутствует' ? true : false}
                                onClick={ onCorrectionIdCheckboxClick }
                            />
                            <span>отсутствует</span>
                        </HStack>
                    </HStack>
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
                    <HStack gap={'32px'}>
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
                        <HStack gap={'4px'}>
                            <Input
                                type={'checkbox'}
                                readOnly={editMode}
                                checked={form?.consignmentNoteId?.value === 'отсутствует' ? true : false}
                                onClick={ onConsignmentNoteIdCheckboxClick }
                            />
                            <span>отсутствует</span>
                        </HStack>
                    </HStack>
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