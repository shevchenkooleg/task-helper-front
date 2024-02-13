import { StateSchema } from '@/app/providers/StoreProvider';
import { getOrderData } from './getOrderData';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';
import { Order } from '../../types/orderDetailsSliceSchema';
import { OrderStatus } from '@/shared/const/orderConsts';

describe('getOrderData.test', () => {
    test('should return order data', () => {
        const order: Order = {
            _id:'65c8677772eea89c1f7b0173',
            userId:'65ace5a2063bdf67412eefe4',
            orderId:'СО00-з11122',
            description:'КРУ-10 Блока №2',
            orderType:OrderType.INDEPENDENT,
            orderExecutionType:OrderExecutionType.PLANNED,
            yearOfExecution:'2025',
            orderStatus: OrderStatus.NONE,
            modified:'2024-02-11T06:24:08.761Z',
            materialCorrections: [],
            consignmentNotes: [],
            executions: [],
            KS2Documents: [],
            writeOffDocuments: []
        };
        const state: DeepPartial<StateSchema> = {
            orderDetails: {
                order: order
            }
        };
        expect(getOrderData(state as StateSchema)).toEqual(order);
    });
    test('must return with empty state', () => {
        expect(getOrderData({} as StateSchema)).toEqual(undefined);
    });
});