import cls from './OrdersYearsOfExecutionSelect.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { getOrderListFiltersYearOfExecution, orderListFiltersSliceActions } from '@/features/orderListFilters';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { MListBox } from '@/shared/ui/Popups/ui/MListBox/MListBox';
import { HStack } from '@/shared/ui/Stack';

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
        <HStack className={classNames(cls.OrdersYearsOfExecutionSelect, {}, [className])}>
            <MListBox
                label={'Год выполнения'}
                items={yearSelectorOptions}
                value={yearOfExecutionValue}
                onChange={onChangeHandler}
            />
        </HStack>
    );
});

OrdersYearsOfExecutionSelect.displayName = 'OrdersYearsOfExecutionSelect';