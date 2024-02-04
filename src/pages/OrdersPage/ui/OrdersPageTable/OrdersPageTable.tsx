import cls from './OrdersPageTable.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { timeConverter } from '@/shared/lib/timeConverter/timeConverter';
import { VStack } from '@/shared/ui/Stack';
import { useNavigate } from 'react-router-dom';
import { getRouteOrderDetails } from '@/shared/const/router';
import { billOfQuantitiesStatusMapper, Order, orderDocumentsStatusMapper, orderStatusMapper } from '@/entities/Order';
import { ordersTitlesMapper } from '@/shared/lib/titleMappers/ordersTitlesMapper';
import { TableGrid } from '@/shared/ui/TableGrid';
import { OrdersSortField, orderTabHeaderKeysArr } from '@/shared/const/orderConsts';
import {
    getOrderListFilterField,
    getOrderListFiltersSortOrder,
    orderListFiltersSliceActions
} from '@/features/orderListFilters';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getOrdersPageTableKeys } from '../../model/selectors/getOrdersPageTableKeys/getOrdersPageTableKeys';

interface OrdersPageTableProps {
    className?: string
    orders?: Order[]
}

export const OrdersPageTable = memo((props: OrdersPageTableProps) => {
    const { className, orders } = props;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    //TODO implement timeZones for different users
    const ordersForRendering = orders?.map((el)=>({ ...el, modified: timeConverter(el.modified!, 3) }));

    const currentSortField = useSelector(getOrderListFilterField);
    const currentSortOrder = useSelector(getOrderListFiltersSortOrder);

    const orderTableActiveKeys = useSelector(getOrdersPageTableKeys) ?? [];
    console.log('orderTableActiveKeys ', orderTableActiveKeys);
    console.log('orderTabHeaderKeysArr ', orderTabHeaderKeysArr);
    const tableKeysForRender = orderTabHeaderKeysArr.filter(key=>orderTableActiveKeys.includes(key));


    const onSortFieldChangeHandler = useCallback((newField: OrdersSortField)=>{
        if (currentSortField === newField){
            console.log(currentSortOrder);
            currentSortOrder === 'asc'
                ? dispatch(orderListFiltersSliceActions.setSortOrder('desc'))
                : dispatch(orderListFiltersSliceActions.setSortOrder('asc'));
        } else {
            dispatch(orderListFiltersSliceActions.setSortField(newField));
            dispatch(orderListFiltersSliceActions.setSortOrder('asc'));
        }

    },[currentSortField, currentSortOrder, dispatch]);

    const onDoubleClickHandler = (e: React.MouseEvent<HTMLTableRowElement>, el: Order) => {
        el._id && navigate(getRouteOrderDetails(el._id));
    };

    const mapper = {
        ...orderStatusMapper, ...orderDocumentsStatusMapper, ...billOfQuantitiesStatusMapper
    };

    if (ordersForRendering){
        return (
            <VStack gap={'32px'}>
                <TableGrid<Order, OrdersSortField, typeof OrdersSortField>
                    tabKeys={tableKeysForRender}
                    headerKeysMapper={ordersTitlesMapper}
                    items={Object.values(ordersForRendering)}
                    callback={onDoubleClickHandler}
                    helpMappers={mapper}
                    currentSortField={currentSortField}
                    currentSortOrder={currentSortOrder}
                    allowSortFields={OrdersSortField}
                    headerFieldClickHandler={onSortFieldChangeHandler}
                />
            </VStack>

        );
    }

    return (
        <div className={classNames(cls.OrdersPageTable, {}, [className])}>
            Orders Table should be here but some things going wrong
        </div>
    );
});

OrdersPageTable.displayName = 'OrdersPageTable';