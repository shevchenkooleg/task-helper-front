import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { OrderDocumentsStatus } from '../../model/consts/orderConsts';

interface OrderStatusSelectProps {
    className?: string
    onChange?: (value: OrderDocumentsStatus) => void
    value?: OrderDocumentsStatus
    readOnly?: boolean
}

const orderStatusMapper: Record<OrderDocumentsStatus, string> = {
    [OrderDocumentsStatus.ON_CLEARANCE]: 'Документ на оформлении',
    [OrderDocumentsStatus.WAITING_FOR_EC]: 'Документ ожидает отправку в СЦ',
    [OrderDocumentsStatus.AGREEMENT_IN_EC]: 'Документ в СЦ на согласовании',
    [OrderDocumentsStatus.AWAITING_SIGNING]: 'Документ распечатан, виза СЦ, ожидает подписания',
    [OrderDocumentsStatus.SUBMITTED_FOR_SIGNING]: 'Документ передан для подписания в АБК',
    [OrderDocumentsStatus.READY_TO_TRANSFER]: 'Документ подписан, готов к передаче в ОЦО',
    [OrderDocumentsStatus.UPLOADED_TO_TTS]: 'Документ загружен в ТТС',
};

const statusOptions = [
    { value: OrderDocumentsStatus.ON_CLEARANCE, content: orderStatusMapper.on_clearance },
    { value: OrderDocumentsStatus.WAITING_FOR_EC, content: orderStatusMapper.waiting_for_EC },
    { value: OrderDocumentsStatus.AGREEMENT_IN_EC, content: orderStatusMapper.agreement_in_EC },
    { value: OrderDocumentsStatus.AWAITING_SIGNING, content: orderStatusMapper.awaiting_signing },
    { value: OrderDocumentsStatus.SUBMITTED_FOR_SIGNING, content: orderStatusMapper.submitted_for_signing },
    { value: OrderDocumentsStatus.READY_TO_TRANSFER, content: orderStatusMapper.ready_to_transfer },
    { value: OrderDocumentsStatus.UPLOADED_TO_TTS, content: orderStatusMapper.uploaded_to_TTS }
];

export const OrderDocumentsStatusSelect = memo((props: OrderStatusSelectProps) => {
    const { className, onChange, readOnly, value } = props;

    const onChangeHandler = useCallback((value: string)=>{
        onChange?.(value as OrderDocumentsStatus);
    },[onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            onChange={onChangeHandler}
            items={statusOptions}
            value={value}
            defaultValue={'Укажите состояние документа'}
            readOnly={readOnly}
            direction={'bottom right'}
            // label={'Состояние документа:'}
            labelMapper={orderStatusMapper}
        />
    );
});

OrderDocumentsStatusSelect.displayName = 'OrderStatusSelect';