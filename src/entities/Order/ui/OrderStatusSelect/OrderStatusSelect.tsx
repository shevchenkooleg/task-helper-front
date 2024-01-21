import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { OrderStatus, orderStatusMapper } from '../../../../shared/const/orderConsts';
import { ButtonSize, ButtonTheme } from '@/shared/ui/Button';

interface OrderStatusSelectProps {
    className?: string
    onChange?: (value: OrderStatus) => void
    value?: OrderStatus
    buttonTheme?: ButtonTheme
    readOnly?: boolean
    size?: ButtonSize
}

const statusOptions = [
    { value: OrderStatus.ISSUED, content: orderStatusMapper.issued },
    { value: OrderStatus.WAITING_FOR_REQUEST, content: orderStatusMapper.waiting_for_request },
    { value: OrderStatus.EXECUTING, content: orderStatusMapper.executing },
    { value: OrderStatus.AGREEMENT, content: orderStatusMapper.agreement },
    { value: OrderStatus.WAITING_FOR_TECHNICAL_CLOSING, content: orderStatusMapper.waiting_for_technical_closing },
    { value: OrderStatus.TECHNICAL_CLOSED, content: orderStatusMapper.technical_closed }
];

export const OrderStatusSelect = memo((props: OrderStatusSelectProps) => {
    const { className, onChange, readOnly, value, buttonTheme, size } = props;

    const onChangeHandler = useCallback((value: string)=>{
        onChange?.(value as OrderStatus);
    },[onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            onChange={onChangeHandler}
            items={statusOptions}
            value={value}
            defaultValue={'Укажите состояние заказа'}
            readOnly={readOnly}
            direction={'bottom right'}
            buttonTheme={buttonTheme}
            size={size}
            // label={'Состояние заказа:'}
            labelMapper={orderStatusMapper}
        />
    );
});

OrderStatusSelect.displayName = 'OrderStatusSelect';