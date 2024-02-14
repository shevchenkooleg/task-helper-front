import { getUserRoles, isUserAdmin, isUserManager, UserRole } from '../../..';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('roleSelectors.test', () => {

    const roles = [UserRole.USER, UserRole.ADMIN];

    const state: DeepPartial<StateSchema> = {
        user: {
            userData: {
                roles: roles
            }
        }
    };


    test('should return right roles', () => {
        expect(getUserRoles(state as StateSchema)).toEqual(roles);
    });
    test('should return "true" as state do not contain AdminRole', () => {
        expect(isUserAdmin(state as StateSchema)).toEqual(true);
    });
    test('should return "false" as state do not contain ManagerRole', () => {
        expect(isUserManager(state as StateSchema)).toEqual(false);
    });
    test('must return with empty state', ()=>{
        expect(getUserRoles({}as StateSchema)).toEqual(undefined);
    });
});