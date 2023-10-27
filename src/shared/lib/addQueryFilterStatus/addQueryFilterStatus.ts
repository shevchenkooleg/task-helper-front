import { OrderStatusQueryMapper } from '@/shared/const/orderConsts';

export type QueryObjectType = Record<string, string>
export type OrderStatusFilterFieldsType = Record<string, boolean>


export function addQueryFilterStatus (
    queryObject: QueryObjectType, orderStatusFilterFields: OrderStatusFilterFieldsType
): typeof queryObject {
    const queryParams = { ...queryObject };
    const filteredStatus = [];
    for (const key in orderStatusFilterFields){
        if (orderStatusFilterFields[key] === true){
            filteredStatus.push(OrderStatusQueryMapper[key]);
        }
    }

    if (filteredStatus.length === 7){
        queryParams.status = 'all';
    }

    if (filteredStatus.length < 7 && filteredStatus.length > 0){
        queryParams.status = filteredStatus.join('%');
    }

    return queryParams;
}