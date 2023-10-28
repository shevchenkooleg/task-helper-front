import { TestAsyncThunk } from '@/shared/lib/test/TestAsyncThunk/TestAsyncThunk';
import { addNewOrder } from '../../..';


const newOrderInstance = {
    description: '',
    orderId: '12345',
    userId: 'qqqwwweee111222333',
    yearOfExecution: '2024'
};

describe('addNewOrder.test', () => {
    test('order adding successfully', async () => {

        const responseData = {
            order: {}
        };
        const thunk = new TestAsyncThunk(addNewOrder, {
            user: {
                tokenAuthData: {
                    access_token: 'dd191697df518af73e6039cbd08db63c15cf11'
                }
            }
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ data: responseData }));
        const result = await thunk.callThunk(newOrderInstance);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(responseData);
    });
    test('error while adding order', async () => {

        const thunk = new TestAsyncThunk(addNewOrder, {
            user: {
                tokenAuthData: {
                    access_token: 'dd191697df518af73e6039cbd08db63c15cf11'
                }
            }
        });

        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk(newOrderInstance);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual('error');
    });
});