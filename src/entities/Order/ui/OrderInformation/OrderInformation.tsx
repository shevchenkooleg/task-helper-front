import cls from './OrderInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Input } from '@/shared/ui/Input';
import { timeConverter } from '@/shared/lib/timeConverter/timeConverter';
import { useSelector } from 'react-redux';
import { getOrderDetailsEditMode } from '../../model/selectors/getEditMode/getOrderDetailsEditMode';
import { VStack } from '@/shared/ui/Stack';
import { getOrderFormData } from '../../model/selectors/getOrderFormData/getOrderFormData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { orderDetailsSliceActions } from '../../model/slice/orderDetailsSlice';
import { BillOfQuantitiesStatus, orderDocumentsStatus, OrderStatus } from '../../model/consts/orderConsts';
import { OrderStatusSelect } from '../OrderStatusSelect/OrderStatusSelect';
import {
    BillOfQuantitiesStatusSelect
} from '../BillOfQuantitiesStatusSelect/BillOfQuantitiesStatusSelect';

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
    const onChangeCorrectionId = useCallback((value?: string, status?: orderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            correctionId: { value: value || '', status: status || orderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);
    const onChangeConsignmentNoteId = useCallback((value?: string, status?: orderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            consignmentNoteId: { value: value || '', status: status || orderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);
    const onChangeBillOfQuantities = useCallback((value?: BillOfQuantitiesStatus, status?: orderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            billOfQuantities: { value: value || BillOfQuantitiesStatus.NOT_LOADED, status: status || orderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);
    const onChangeKS2Id = useCallback((value?: string, status?: orderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            KS2Id: { value: value || '', status: status || orderDocumentsStatus.ON_CLEARANCE }
        }));
    }, [dispatch]);
    const onChangeWriteOffActId = useCallback((value?: string, status?: orderDocumentsStatus) => {
        dispatch(orderDetailsSliceActions.updateOrderForm({
            writeOffActId: { value: value || '', status: status || orderDocumentsStatus.ON_CLEARANCE }
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

                <Input
                    readOnly={editMode}
                    placeholder={'Номер корректировки:'}
                    value={form?.correctionId?.value}
                    onChange={onChangeCorrectionId}
                />

                <Input
                    readOnly={editMode}
                    placeholder={'Номер накладной М11:'}
                    value={form?.consignmentNoteId?.value}
                    onChange={onChangeConsignmentNoteId}
                />

                <BillOfQuantitiesStatusSelect
                    readOnly={editMode}
                    value={form?.billOfQuantities?.value}
                    onChange={onChangeBillOfQuantities}
                />

                <Input
                    readOnly={editMode}
                    placeholder={'Номер КС-2:'}
                    value={form?.KS2Id?.value}
                    onChange={onChangeKS2Id}
                />

                <Input
                    readOnly={editMode}
                    placeholder={'Номер акта на списание:'}
                    value={form?.writeOffActId?.value}
                    onChange={onChangeWriteOffActId}
                />

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