import { getOrderListSelector } from '../../..';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Order, OrderStatus } from '@/entities/Order';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';

describe('getOrderList.test', () => {

    const mockedData: Array<Order> = [{
        _id:'65b00dbcee466d1d3074bd6a',
        userId:'65ace5a2063bdf67412eefe4',
        orderId:'СО00-з00099',
        description:'121wqfeqwf',
        orderType:OrderType.INDEPENDENT,
        orderExecutionType:OrderExecutionType.PLANNED,
        yearOfExecution:'2025',
        orderStatus:OrderStatus.ISSUED,
        modified:'2024-02-03T10:21:27.882Z',
        materialCorrections:[],
        consignmentNotes:[],
        executions:[],
        KS2Documents:[],
        writeOffDocuments:[],
        materials:[],
    }];

    const state: DeepPartial<StateSchema> = {
        orders: {
            searchInOrders: mockedData
        }
    };

    test('should return orderList after search', () => {
        expect(getOrderListSelector(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', () => {
        expect(getOrderListSelector({} as StateSchema)).toEqual(undefined);
    });
});