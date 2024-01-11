import { StateSchema } from '@/app/providers/StoreProvider';

export const getReportPageSettings = (state: StateSchema) => {
    return state.reports?.reportPageSettings;
};