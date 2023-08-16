import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { OrderStatus } from '../../model/consts/orderConsts';

interface OrderStatusSelectProps {
    className?: string
    onChange?: (value: OrderStatus) => void
    value?: OrderStatus
    readOnly?: boolean
}

const orderStatusMapper: Record<OrderStatus, string> = {
    [OrderStatus.ISSUED]: 'На оформлении',
    [OrderStatus.TECHNICAL_CLOSED]: 'Технически закрыт',
    [OrderStatus.EXECUTING]: 'Выполнение',
    [OrderStatus.AGREEMENT]: 'На согласовании',
    [OrderStatus.WAITING_FOR_REQUEST]: 'Ожидает запроса в ОРТПиР',
    [OrderStatus.WAITING_FOR_TECHNICAL_CLOSING]: 'Ожидает технического закрытия',
    [OrderStatus.NONE]: 'Статус не указан',
};

const statusOptions = [
    { value: OrderStatus.AGREEMENT, content: orderStatusMapper.agreement },
    { value: OrderStatus.EXECUTING, content: orderStatusMapper.executing },
    { value: OrderStatus.WAITING_FOR_REQUEST, content: orderStatusMapper.waiting_for_request },
    { value: OrderStatus.ISSUED, content: orderStatusMapper.issued },
    { value: OrderStatus.WAITING_FOR_TECHNICAL_CLOSING, content: orderStatusMapper.waiting_for_technical_closing },
    { value: OrderStatus.TECHNICAL_CLOSED, content: orderStatusMapper.technical_closed }
];

export const OrderStatusSelect = memo((props: OrderStatusSelectProps) => {
    const { className, onChange, readOnly, value } = props;

    const onChangeHandler = useCallback((value: string)=>{
        onChange?.(value as OrderStatus);
    },[onChange]);

    console.log(statusOptions);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            onChange={onChangeHandler}
            items={statusOptions}
            value={value}
            defaultValue={'Укажите состояние заказа'}
            readOnly={readOnly}
            direction={'bottom right'}
            label={'Состояние заказа:'}
            labelMapper={orderStatusMapper}
        />
    );
});

OrderStatusSelect.displayName = 'OrderStatusSelect';