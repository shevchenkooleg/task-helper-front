import cls from './OrdersPageTable.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { OrderTabHeaderKeys } from '@/features/addNewOrder';
import { timeConverter } from '@/shared/lib/timeConverter/timeConverter';
import { VStack } from '@/shared/ui/Stack';
import { useNavigate } from 'react-router-dom';
import { getRouteOrderDetails } from '@/shared/const/router';
import { billOfQuantitiesStatusMapper, Order, orderDocumentsStatusMapper, orderStatusMapper } from '@/entities/Order';
import { ordersTitlesMapper } from '@/shared/lib/titleMappers/ordersTitlesMapper';
import { TableGrid } from '@/shared/ui/TableGrid';

interface OrdersPageTableProps {
    className?: string
    orders?: Order[]
}

export const OrdersPageTable = memo((props: OrdersPageTableProps) => {
    const { className, orders } = props;
    const navigate = useNavigate();
    const ordersForRendering = orders?.map((el)=>({ ...el, modified: timeConverter(el.modified!) }));
    const orderTabHeaderKeys = [
        OrderTabHeaderKeys.SERIAL_NUMBER,
        OrderTabHeaderKeys.ORDER_ID,
        OrderTabHeaderKeys.EXECUTED_ID,
        OrderTabHeaderKeys.DESCRIPTION,
        OrderTabHeaderKeys.ORDER_STATUS,
        OrderTabHeaderKeys.CORRECTION_ID,
        OrderTabHeaderKeys.CONSIGNMENT_NOTE_ID,
        OrderTabHeaderKeys.BILL_OF_QUANTITIES,
        OrderTabHeaderKeys.KS2_ID,
        OrderTabHeaderKeys.WRITE_OFF_ACT_ID,
        OrderTabHeaderKeys.YEAR_OF_EXECUTION,
        OrderTabHeaderKeys.MODIFIED
    ];

    const onDoubleClickHandler = (e: React.MouseEvent<HTMLTableRowElement>, el: Order) => {
        el._id && navigate(getRouteOrderDetails(el._id));
    };

    const mapper = {
        ...orderStatusMapper, ...orderDocumentsStatusMapper, ...billOfQuantitiesStatusMapper
    };

    if (ordersForRendering){
        return (
            <VStack gap={'32px'}>
                <TableGrid<Order>
                    tabKeys={orderTabHeaderKeys}
                    headerKeysMapper={ordersTitlesMapper}
                    items={Object.values(ordersForRendering)}
                    callback={onDoubleClickHandler}
                    helpMappers={mapper}
                    tooltip={true}
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