import cls from './OrdersYearsOfExecutionSelect.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { getOrderListFiltersYearOfExecution, orderListFiltersSliceActions } from '@/features/orderListFilters';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ButtonSize } from '@/shared/ui/Button';

interface OrdersYearsOfExecutionSelectProps {
    className?: string
}

const yearSelectorOptions = [
    { value: 'any', content: 'Любой' },
    { value: '2023', content: '2023' },
    { value: '2024', content: '2024' },
    { value: '2025', content: '2025' },
];

export const OrdersYearsOfExecutionSelect = memo((props: OrdersYearsOfExecutionSelectProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const yearOfExecutionValue = useSelector(getOrderListFiltersYearOfExecution) ?? 'Год выполнения';


    const onChangeHandler = useCallback((newValue: string) => {
        dispatch(orderListFiltersSliceActions.setYearOfExecutionsFilter(newValue));
    },[dispatch]);

    return (
        <div className={classNames(cls.OrdersYearsOfExecutionSelect, {}, [className])}>
            <ListBox
                items={yearSelectorOptions}
                value={yearOfExecutionValue === 'any' ? 'Год выполнения' : yearOfExecutionValue}
                onChange={onChangeHandler}
                size={ButtonSize.SIZE_S}
            />
        </div>
    );
});

OrdersYearsOfExecutionSelect.displayName = 'OrdersYearsOfExecutionSelect';