import { TestAsyncThunk } from '@/shared/lib/test/TestAsyncThunk/TestAsyncThunk';
import { getUserInfo } from '../../..';
import { userActions, UserRole } from '@/entities/User';

describe('getUserInfo.test', () => {
    test('success get userData', async () => {

        const responseData = {
            name: 'testUser',
            roles: ['USER', 'ADMIN'] as UserRole[],
            scope:  '*',
            user_id:  '4d34ffc71ffcfc82e8df7'
        };
        const thunk = new TestAsyncThunk(getUserInfo, {
            user: {
                tokenAuthData: {
                    access_token: 'dd191697df518af73e6039cbd08db63c15cf11'
                }
            }
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: responseData }));
        const result = await thunk.callThunk(null);
        console.log('result: ', result);
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.initAuthData());
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setUserData(responseData));
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setIsInit());
        expect(thunk.dispatch).toHaveBeenCalledTimes(5);
        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(responseData);
    });
    test('invalid access_token, reject userData call', async () => {
        const thunk = new TestAsyncThunk(getUserInfo, {
            user: {
                tokenAuthData: {
                    access_token: 'dd191697df518af73e6039cbd08db63c15cf11'
                }
            }
        });
        thunk.api.get.mockReturnValue(Promise.reject({ status: 401, response: { data: 'Unauthorized' } }));
        const result = await thunk.callThunk(null);
        console.log('result: ', result);

        expect(thunk.dispatch).toHaveBeenCalledTimes(5);
        expect(thunk.api.get).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.initAuthData());
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.logout());
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setIsInit());
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('Unauthorized');
    });

    test('server error', async () => {
        const thunk = new TestAsyncThunk(getUserInfo, {
            user: {
                tokenAuthData: {
                    access_token: 'dd191697df518af73e6039cbd08db63c15cf11'
                }
            }
        });
        thunk.api.get.mockReturnValue(Promise.reject({ status: 403 }));

        const result = await thunk.callThunk(null);

        console.log('result: ', result);

        expect(thunk.dispatch).toHaveBeenCalledTimes(4);
        expect(thunk.api.get).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.initAuthData());
        expect(thunk.dispatch).not.toHaveBeenCalledWith(userActions.logout());
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setIsInit());
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});