import { StateSchema } from '@/app/providers/StoreProvider';
import { OrderDetailsCardView } from '@/shared/const/orderDetailsConsts';
import {
    getOrderDetailsCardView
} from './getOrderDetailsCardView';


describe('getOrderDetailsCardView.test', () => {
    test('should return correct orderDetailsCardView', () => {
        const state: DeepPartial<StateSchema> = {
            orderDetails: {
                view: OrderDetailsCardView.MATERIAL
            }
        };
        expect(getOrderDetailsCardView(state as StateSchema)).toEqual(OrderDetailsCardView.MATERIAL);
    });
    test('must return with empty state', () => {
        expect(getOrderDetailsCardView({} as StateSchema)).toEqual(undefined);
    });
});