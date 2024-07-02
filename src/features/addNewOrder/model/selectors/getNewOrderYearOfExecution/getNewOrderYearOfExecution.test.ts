import { getNewOrderYearOfExecution } from '../../../index';
import { StateSchema } from '@/app/providers/StoreProvider';

describe('getNewOrderYearOfExecution.test', () => {

    const state: DeepPartial<StateSchema> = {
        newOrder: {
            newOrder: {
                yearOfExecution: '1987'
            }
        }
    };

    test('should return newOrderYearOfExecution', () => {
        expect(getNewOrderYearOfExecution(state as StateSchema)).toEqual('1987');
    });
    test('must return with empty state', () => {
        expect(getNewOrderYearOfExecution({} as StateSchema)).toEqual(undefined);
    });
});