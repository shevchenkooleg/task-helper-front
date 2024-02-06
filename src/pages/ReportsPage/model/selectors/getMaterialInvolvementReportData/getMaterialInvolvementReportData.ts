import { StateSchema } from '@/app/providers/StoreProvider';

export const getMaterialInvolvementReportData = (state: StateSchema) => {
    return state.reports?.ordersWithExecMaterialIdReport;
};