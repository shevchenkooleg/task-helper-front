import { MaterialToReportTab } from '@/entities/Material';

export interface ReportsPageSchema {
    totalVolumeMaterialReport: Array<MaterialToReportTab>
    reportPageSettings: ''
    isLoading: boolean
    error?: string
    _isInit: boolean
}

export enum ReportPanelContentMode {
    ORDERS_REPORTS = 'orders-reports',
    MATERIALS_REPORTS = 'materials-reports'
}