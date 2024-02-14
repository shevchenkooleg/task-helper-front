import { WriteOffDocumentInterface } from '../../..';
import { OrderDocumentsStatus } from '@/shared/const/orderConsts';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getWriteOffDocuments } from './getWriteOffDocuments';

describe('getWriteOffDocuments.test', () => {

    const mockData: Array<WriteOffDocumentInterface> = [
        {
            value:'111',
            status:OrderDocumentsStatus.UPLOADED_TO_TTS,
            _executionId:'65cbb07b72eea89c1f7b0507',
            _id:'65ccf4aa72eea89c1f7b053d',
        },
        {
            value:'222',
            status:OrderDocumentsStatus.UPLOADED_TO_TTS,
            _executionId:'65cbb08972eea89c1f7b0519',
            _id:'65ccf4ae72eea89c1f7b0546',
        },
        {
            value:'333',
            status:OrderDocumentsStatus.SUBMITTED_FOR_SIGNING,
            _executionId:'65cbb08972eea89c1f7b0519',
            _id:'65ccf4b172eea89c1f7b054f',
        }
    ];

    const state: DeepPartial<StateSchema> = {
        orderDetails: {
            form: {
                writeOffDocuments: mockData
            }
        }
    };

    test('should return writeOffDocumentsArray', () => {
        expect(getWriteOffDocuments(state as StateSchema)).toEqual(mockData);
    });
    test('must return with empty state', ()=>{
        expect(getWriteOffDocuments({} as StateSchema)).toEqual(undefined);
    });
});