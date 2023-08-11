import { type PageSchema } from '../types/pageSchema';
import { pageSliceActions, pageSliceReducer } from './pageSlice';



describe('pageSlice.test', () => {
    test('should change scroll position', () => {
        const state: DeepPartial<PageSchema> = {
            scroll: {

            }
        };
        expect(pageSliceReducer(
            state as PageSchema,
            pageSliceActions.setScrollPosition({ position: 1331, path: '/articles' })
        )).toEqual({
            scroll: {
                '/articles': 1331
            }
        });
    });
});
