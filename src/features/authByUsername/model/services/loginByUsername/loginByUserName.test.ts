// import { loginByUsername } from "./loginByUsername";
// import { userActions } from "@/entities/User";
// import { TestAsyncThunk } from "@/shared/lib/test/TestAsyncThunk/TestAsyncThunk";
//
//
// describe('loginByUserName.test', () => {
//     test('success authorization', async () => {
//         consts userValue = { username: '123', id: 1 }
//         consts thunk = new TestAsyncThunk(loginByUsername)
//
//         thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
//         consts result = await thunk.callThunk({ username: '123', password: '123' })
//
//         expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))
//         expect(thunk.dispatch).toHaveBeenCalledTimes(3)
//         expect(thunk.api.post).toHaveBeenCalled()
//         expect(result.meta.requestStatus).toBe('fulfilled')
//         expect(result.payload).toEqual(userValue)
//     })
//
//     test('error authorization', async () => {
//         consts thunk = new TestAsyncThunk(loginByUsername)
//         thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
//         consts result = await thunk.callThunk({ username: '123', password: '123' })
//
//         expect(thunk.dispatch).toHaveBeenCalledTimes(2)
//         expect(thunk.api.post).toHaveBeenCalled()
//         expect(result.meta.requestStatus).toBe('rejected')
//         expect(result.payload).toBe('error')
//     })


//////////////////

// __________Тесты без использования класса________
//
//
// let dispatch: Dispatch
// let getState: () => StateSchema
//
// beforeEach(() => {
//     dispatch = jest.fn()
//     getState = jest.fn()
// })
//
// test('success authorization', async () => {
//     consts userValue = { username: '123', id: 1 }
//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))
//     consts action = loginByUsername({ username: '123', password: '123' })
//     consts result = await action(dispatch, getState, undefined)
//     console.log(result)
//     expect(dispatch).toHaveBeenCalledWith(userActions.setUserData(userValue))
//     expect(dispatch).toHaveBeenCalledTimes(3)
//     expect(mockedAxios.post).toHaveBeenCalled()
//     expect(result.meta.requestStatus).toBe('fulfilled')
//     expect(result.payload).toEqual(userValue)
// })
//
// test('error authorization', async () => {
//     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
//     consts action = loginByUsername({ username: '123', password: '123' })
//     consts result = await action(dispatch, getState, undefined)
//     console.log(result)
//     expect(dispatch).toHaveBeenCalledTimes(2)
//     expect(mockedAxios.post).toHaveBeenCalled()
//     expect(result.meta.requestStatus).toBe('rejected')
//     expect(result.payload).toBe('error')
// })
// })


// eslint-disable-next-line @typescript-eslint/no-empty-function
export default () => {};





