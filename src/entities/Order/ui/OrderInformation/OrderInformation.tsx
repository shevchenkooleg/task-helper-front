import cls from './OrderInformation.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Input } from '@/shared/ui/Input';
import { timeConverter } from '@/shared/lib/timeConverter/timeConverter';
import { useSelector } from 'react-redux';
import { getOrderData } from '../../model/selectors/getOrderData/getOrderData';
import { getEditMode } from '../../model/selectors/getEditMode/getEditMode';
import { VStack } from '@/shared/ui/Stack';

interface OrderInformationProps {
    className?: string
}

export const OrderInformation = memo((props: OrderInformationProps) => {
    const { className } = props;
    const order = useSelector(getOrderData);
    const editMode = !useSelector(getEditMode);

    return (
        <>
            <div>Информация о заказе</div>
            <VStack max align={'start'} gap={'8px'} className={classNames(cls.OrderInformation, {}, [className])}>
                <Input readOnly={true} placeholder={'Номер заказа:'} value={order?.orderId}/>
                <Input readOnly={editMode} placeholder={'Номер выполнения:'} value={order?.executeId}/>
                <Input readOnly={editMode} placeholder={'Оборудование:'} value={order?.description}/>
                <Input readOnly={editMode} placeholder={'Состояние заказа:'} value={order?.orderStatus}/>
                <Input readOnly={editMode} placeholder={'Номер корректировки:'} value={order?.correctionId}/>
                <Input readOnly={editMode} placeholder={'Номер накладной М11:'} value={order?.consignmentNoteId}/>
                <Input readOnly={editMode} placeholder={'Состояние ВОР:'} value={order?.billOfQuantities}/>
                <Input readOnly={editMode} placeholder={'Номер КС-2:'} value={order?.KS2Id}/>
                <Input readOnly={editMode} placeholder={'Номер акта на списание:'} value={order?.writeOffActId}/>
                <Input readOnly={editMode} placeholder={'Год выполнения:'} value={order?.yearOfExecution}/>
                <Input readOnly={true} placeholder={'Последнее изменение:'} value={timeConverter(order?.modified ? order.modified : '')}/>
            </VStack>
        </>
    );
});

OrderInformation.displayName = 'OrderInformation';