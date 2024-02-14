import { getTokenAuthData } from './getTokenAuthData';
import { StateSchema } from '@/app/providers/StoreProvider';
import { TokenResponseInterface } from '../../types/user';

describe('getTokenAuthData.test', () => {

    const mockTokenData: TokenResponseInterface = {
        access_token:'e98c0ec6d1e14e294fe2760a229ba51',
        refresh_token:'5c59f4cc646eae522cafdddcb5e06b42'
    };

    const state: DeepPartial<StateSchema> = {
        user: {
            tokenAuthData: mockTokenData
        }
    };

    test('should return tokenAuthData', () => {
        expect(getTokenAuthData(state as StateSchema)).toEqual(mockTokenData.access_token);
    });
    test('must return with empty state', ()=>{
        expect(getTokenAuthData({} as StateSchema)).toEqual(undefined);
    });
});