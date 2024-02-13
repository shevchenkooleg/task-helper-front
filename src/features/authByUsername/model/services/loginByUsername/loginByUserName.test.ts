import { loginByUsername } from './loginByUsername';
import { TestAsyncThunk } from '@/shared/lib/test/TestAsyncThunk/TestAsyncThunk';
import { userActions } from '@/entities/User';


describe('loginByUserName.test', () => {
    test('success authorization', async () => {

        const responseData = {
            access_token: 'a0c4a2eb2bb6ed210f1b32bd6845dd191697df518af73e6039cbd08db63c15cf11',
            refresh_token: '0058231b4d0120fa07c761f3a604b082179d878d57cff550db0316327a787d9511',
            expires_in: 8640011,
            token_type: 'Bearer11'
        };
        const thunk = new TestAsyncThunk(loginByUsername);

        thunk.api.post.mockReturnValue(Promise.resolve({ data: responseData }));


        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setTokenAuthData(responseData));
        expect(thunk.dispatch).toHaveBeenCalledTimes(4);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(responseData);
    });

    test('error authorization', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});


//////////////////

// __________Тесты без использования класса________
//
//

// let dispatch: Dispatch;
// let getState: () => StateSchema;
// jest.mock('axios');
// const mockedAxios = jest.mocked(axios, true);
//
// beforeEach(() => {
//     dispatch = jest.fn();
//     getState = jest.fn();
// });
//
// describe('loginByUserName.test', () => {
//     test('success authorization', async () => {
//         const responseData = {
//             access_token: 'a0c4a2eb2bb6ed210f1b32bd6845dd191697df518af73e6039cbd08db63c15cf11',
//             refresh_token: '0058231b4d0120fa07c761f3a604b082179d878d57cff550db0316327a787d9511',
//             expires_in: 8640011,
//             token_type: 'Bearer11'
//         };
//         mockedAxios.post.mockReturnValue(Promise.resolve({ data: responseData }));
//         const action = loginByUsername({ username: '123', password: '123' });
//         const result = await action(dispatch, getState, { api: mockedAxios });
//         expect(dispatch).toHaveBeenCalledWith(userActions.setTokenAuthData(responseData));
//         expect(dispatch).toHaveBeenCalledTimes(4);
//         expect(mockedAxios.post).toHaveBeenCalled();
//         expect(result.meta.requestStatus).toBe('fulfilled');
//         expect(result.payload).toEqual(responseData);
//     });
//
//     test('error authorization', async () => {
//         mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
//         const action = loginByUsername({ username: '123', password: '123' });
//         const result = await action(dispatch, getState, { api: mockedAxios });
//         expect(dispatch).toHaveBeenCalledTimes(2);
//         expect(mockedAxios.post).toHaveBeenCalled();
//         expect(result.meta.requestStatus).toBe('rejected');
//         expect(result.payload).toBe('error');
//     });
// });