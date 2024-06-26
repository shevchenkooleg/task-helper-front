import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { MListBox } from '@/shared/ui/Popups';
import { OrderDocumentsStatus, orderDocumentsStatusMapper } from '../../../../shared/const/orderConsts';
import { ButtonSize, ButtonTheme } from '@/shared/ui/Button';

interface OrderStatusSelectProps {
    className?: string
    onChange?: (value: OrderDocumentsStatus) => void
    value?: OrderDocumentsStatus
    readOnly?: boolean
    size?: ButtonSize
    buttonTheme?: ButtonTheme
}

const statusOptions = [
    { value: OrderDocumentsStatus.ON_CLEARANCE, content: orderDocumentsStatusMapper.on_clearance },
    { value: OrderDocumentsStatus.WAITING_FOR_EC, content: orderDocumentsStatusMapper.waiting_for_EC },
    { value: OrderDocumentsStatus.AGREEMENT_IN_EC, content: orderDocumentsStatusMapper.agreement_in_EC },
    { value: OrderDocumentsStatus.AWAITING_SIGNING, content: orderDocumentsStatusMapper.awaiting_signing },
    { value: OrderDocumentsStatus.SUBMITTED_FOR_SIGNING, content: orderDocumentsStatusMapper.submt_for_signing },
    { value: OrderDocumentsStatus.READY_TO_TRANSFER, content: orderDocumentsStatusMapper.ready_to_transfer },
    { value: OrderDocumentsStatus.UPLOADED_TO_TTS, content: orderDocumentsStatusMapper.uploaded_to_TTS }
];

export const OrderDocumentsStatusSelect = memo((props: OrderStatusSelectProps) => {
    const { className, onChange, readOnly, value, size, buttonTheme } = props;

    const onChangeHandler = useCallback((value: string)=>{
        onChange?.(value as OrderDocumentsStatus);
    },[onChange]);

    console.log('value ', value);

    return (
        <MListBox
            className={classNames('', {}, [className])}
            onChange={onChangeHandler}
            items={statusOptions}
            value={value}
            defaultValue={'Укажите состояние документа'}
            readOnly={readOnly}
            direction={'bottom right'}
            size={size}
            buttonTheme={buttonTheme}
            // label={'Состояние документа:'}
            labelMapper={orderDocumentsStatusMapper}
        />
    );
});

OrderDocumentsStatusSelect.displayName = 'OrderStatusSelect';