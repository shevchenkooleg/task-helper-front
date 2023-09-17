import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
    test('test with one param', () => {
        const params = getQueryParams({
            test: 'value'
        });
        expect(params).toEqual('?test=value');
    });
    test('test with multiple params', () => {
        const params = getQueryParams({
            test: 'value',
            bla: 'yo'
        });
        expect(params).toEqual('?test=value&bla=yo');
    });
    test('test with undefined params', () => {
        const params = getQueryParams({
            test: 'value',
            bla: undefined,
            qqq: 'rrr'
        });
        expect(params).toEqual('?test=value&qqq=rrr');
    });
});
