import { MaterialToReportTab } from '@/entities/Material';
import { Order } from '@/entities/Order';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';

export interface ReportsPageSchema {
    totalVolumeMaterialReport: Array<MaterialToReportTab>
    ordersWithExecMaterialIdReport: Array<Order>
    reportPageSettings: ReportsPageSetting
    isLoading: boolean
    error?: string
    _isInit: boolean
}

export interface ReportsPageSetting {
    orderType: OrderType
    orderExecutionType: OrderExecutionType
    reportYear: string
}

export enum ReportPanelContentMode {
    ORDERS_REPORTS = 'orders-reports',
    MATERIALS_REPORTS = 'materials-reports'
}