import { type StateSchema } from '@/app/providers/StoreProvider';
import { getPageScroll, getScrollPositionByPath } from './pageSelectors';

describe('pageSelectors.test', () => {
    test('should return correct scroll object', () => {
        const data: DeepPartial<StateSchema> = {
            page: {
                scroll: {
                    '/articles': 300,
                    '/profile': 120
                }
            }
        };

        expect(getPageScroll(data as StateSchema)).toEqual({
            '/articles': 300,
            '/profile': 120
        });
    });
    test('should work with empty state', () => {
        const data: DeepPartial<StateSchema> = {
            page: {
                scroll: {}
            }
        };

        expect(getPageScroll(data as StateSchema)).toEqual({});
    });
    test('should return correct scroll position by pathName', () => {
        const data: DeepPartial<StateSchema> = {
            page: {
                scroll: {
                    '/articles': 300,
                    '/profile': 120
                }
            }
        };
        expect(getScrollPositionByPath(data as StateSchema, '/articles')).toBe(300);
    });
});

