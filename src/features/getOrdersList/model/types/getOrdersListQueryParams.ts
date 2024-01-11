import { OrdersSortField } from '@/shared/const/orderConsts';
import { SortOrder } from '@/shared/types/sort';
import { OrderStatusFilterFieldsType } from '@/shared/lib/addQueryFilterStatus/addQueryFilterStatus';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';

export interface GetOrdersListQueryParams {
    sort?: OrdersSortField,
    order?: SortOrder,
    yearOfExecution?: string,
    orderStatusFilterFields?: OrderStatusFilterFieldsType,
    orderType?: OrderType,
    orderExecutionType?: OrderExecutionType
}