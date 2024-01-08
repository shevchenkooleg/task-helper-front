import { StateSchema } from '@/app/providers/StoreProvider';

export const getTotalVolumeMaterialReportData = (state: StateSchema) => {
    return state.reports?.totalVolumeMaterialReport;
};