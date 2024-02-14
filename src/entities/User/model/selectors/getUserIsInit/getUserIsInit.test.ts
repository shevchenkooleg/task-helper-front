import { getUserIsInit } from './getUserIsInit';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getUserIsInit.test', () => {

    const state: DeepPartial<StateSchema> = {
        user: {
            _isInit: true
        }
    };


    test('should return userIsInit', () => {
        expect(getUserIsInit(state as StateSchema)).toEqual(true);
    });
    test('must return with empty state', ()=>{
        expect(getUserIsInit({}as StateSchema)).toEqual(undefined);
    });
});