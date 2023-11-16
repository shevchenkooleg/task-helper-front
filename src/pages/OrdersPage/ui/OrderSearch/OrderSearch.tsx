import { memo } from 'react';
import { Material } from '@/entities/Material';
import { Search } from '@/shared/ui/Search';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './OrderSearch.module.scss';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ordersPageSliceActions } from '../../model/slice/ordersPageSlice';

interface OrderSearchProps {
    className?: string
    value?: string
    searchResultList?: Array<any>
    searchQuery?: string
    setSearchQuery?: (value: string)=>void
    callback?: (item:Material)=>void
}

export const OrderSearch = memo((props: OrderSearchProps) => {

    const { className } = props;
    const dispatch = useAppDispatch();

    const debounceSearchCallback = useDebounce(
        (item: string) => {
            console.log('search', item);
            dispatch(ordersPageSliceActions.searchInOrders(item));
        },
        1000);

    return (
        <div className={classNames(cls.OrderSearch, {}, [className])}>
            <Search onChange={debounceSearchCallback}/>
        </div>
    );
});

OrderSearch.displayName = 'OrderSearch';