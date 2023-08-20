import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { BillOfQuantitiesStatus, billOfQuantitiesStatusMapper } from '../../../../shared/const/orderConsts';

interface BillOfQuantitiesStatusSelectProps {
    className?: string
    onChange?: (value: BillOfQuantitiesStatus) => void
    value?: BillOfQuantitiesStatus
    readOnly?: boolean
}

// const billOfQuantitiesStatusMapper: Record<BillOfQuantitiesStatus, string> = {
//     [BillOfQuantitiesStatus.LOADED]: 'Загружен в ТОРО',
//     [BillOfQuantitiesStatus.NOT_LOADED]: 'Не загружен в ТОРО',
// };

const statusOptions = [
    { value: BillOfQuantitiesStatus.NOT_LOADED, content: billOfQuantitiesStatusMapper.not_loaded },
    { value: BillOfQuantitiesStatus.LOADED, content: billOfQuantitiesStatusMapper.loaded },
];

export const BillOfQuantitiesStatusSelect = memo((props: BillOfQuantitiesStatusSelectProps) => {
    const { className, readOnly, value, onChange } = props;
    const onChangeHandler = useCallback((value: string)=>{
        onChange?.(value as BillOfQuantitiesStatus);
    },[onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            value={value}
            items={statusOptions}
            onChange={onChangeHandler}
            defaultValue={'Укажите статус ВОР'}
            direction={'bottom right'}
            label={'Состояние ВОР'}
            readOnly={readOnly}
            labelMapper={billOfQuantitiesStatusMapper}
        />
    );
});

BillOfQuantitiesStatusSelect.displayName = 'BillOfQuantitiesStatusSelect';