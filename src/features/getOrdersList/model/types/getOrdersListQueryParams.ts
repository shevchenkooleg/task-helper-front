import { OrdersSortField } from '@/shared/const/orderConsts';
import { SortOrder } from '@/shared/types/sort';

export interface GetOrdersListQueryParams {
    sort?: OrdersSortField,
    order?: SortOrder,
    yearOfExecution?: string
}