import { getOrderFormKS2 } from './getOrderFormKS2';
import { KS2DocumentInterface } from '../../types/orderDetailsSliceSchema';
import { OrderDocumentsStatus } from '@/shared/const/orderConsts';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getOrderFormKS2.test', () => {

    const mockData:Array<KS2DocumentInterface> = [{
        value:'111',
        status:OrderDocumentsStatus.AWAITING_SIGNING,
        _executionId:'65cbb07b72eea89c1f7b0507',
        _id:'65cbb07e72eea89c1f7b0510',
    },{
        value:'222',
        status:OrderDocumentsStatus.UPLOADED_TO_TTS,
        _executionId:'65cbb07b72eea89c1f7b0507',
        _id:'65cceee572eea89c1f7b052b',
    }
    ];

    const state: DeepPartial<StateSchema> = {
        orderDetails: {
            form: {
                KS2Documents: mockData
            },
            order: {
                
            }
        }
    };

    test('should return orderFormKS2', () => {
        expect(getOrderFormKS2(state as StateSchema)).toEqual(mockData);
    });
    test('must return with empty state', ()=>{
        expect(getOrderFormKS2({} as StateSchema)).toEqual(undefined);
    });
});