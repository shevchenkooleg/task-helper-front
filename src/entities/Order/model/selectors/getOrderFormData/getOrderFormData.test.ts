import { getOrderFormData, Order, OrderStatus } from '../../..';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getOrderFormData.test', () => {
    test('should return orderFormData', () => {
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
                form: order
            }
        };

        expect(getOrderFormData(state as StateSchema)).toEqual(order);
    });
    test('must return with empty state',()=>{
        expect(getOrderFormData({} as StateSchema)).toEqual(undefined);
    });
});