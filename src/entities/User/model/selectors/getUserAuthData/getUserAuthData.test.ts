import { getUserAuthData } from './getUserAuthData';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getUserAuthData.test', () => {

    const state: DeepPartial<StateSchema> = {
        user: {
            userData: {
                user_id: '6qwlnewgjkb532tdg412eefe4'
            }
        }
    };

    test('should return userAuthData', () => {
        expect(getUserAuthData(state as StateSchema)).toEqual('6qwlnewgjkb532tdg412eefe4');
    });
    test('must return with empty state', ()=>{
        expect(getUserAuthData({}as StateSchema)).toEqual(undefined);
    });
});