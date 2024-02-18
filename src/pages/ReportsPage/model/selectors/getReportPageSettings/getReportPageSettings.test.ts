import { ReportsPageSetting } from '../../types/reportsPage';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getReportPageSettings } from '../../..';

describe('getReportPageSettings.test', () => {

    const mockData: ReportsPageSetting = {
        orderType: OrderType.INDEPENDENT,
        orderExecutionType: OrderExecutionType.PLANNED,
        reportYear: '1987'
    };

    const state: DeepPartial<StateSchema> = {
        reports: {
            reportPageSettings: mockData
        }
    };

    test('should return reportPageSettings', () => {
        expect(getReportPageSettings(state as StateSchema)).toEqual(mockData);
    });
});
test('must return with empty state', () => {
    expect(getReportPageSettings({} as StateSchema)).toEqual(undefined);
}); 