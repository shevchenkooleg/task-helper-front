import { ExecutionStatus } from '@/shared/const/orderConsts';
import { getOrderFormExecutions, OrderExecutionInterface } from '../../..';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getOrderFormExecutions.test', () => {
    test('should return orderFormExecutions', () => {
        const mockedData: Array<OrderExecutionInterface> = [{
            value:'СО-0001',
            status:ExecutionStatus.AGREEMENT,
            _orderId:'65c8677772eea89c1f7b0173',
            _id:'65cbb07b72eea89c1f7b0507',
        },
        {
            value:'СО-0002',
            status:ExecutionStatus.TECHNICAL_CLOSED,
            _orderId:'65c8677772eea89c1f7b0173',
            _id:'65cbb08972eea89c1f7b',
        }];
        const state: DeepPartial<StateSchema> = {
            orderDetails: {
                form: {
                    executions: mockedData
                }
            }
        };
        expect(getOrderFormExecutions(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', ()=>{
        expect(getOrderFormExecutions({} as StateSchema)).toEqual(undefined);
    });
});