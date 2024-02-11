import { MaterialToReportTab } from '@/entities/Material';
import { Order } from '@/entities/Order';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';

export interface ReportsPageSchema {
    totalVolumeMaterialReport: Array<MaterialToReportTab>
    materialInvolvementReport: Array<Order>
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

export enum ReportPanelActiveTabValues {
    ORDERS_REPORTS = 'orders-reports',
    MATERIALS_REPORTS = 'materials-reports'
}

export enum ReportPanelContentType {
    REPORT_PAGE = 'report-page',
    TOTAL_VOLUME_MATERIAL_REPORT = 'total-volume-material',
    MATERIAL_INVOLVEMENT_REPORT = 'material-involvement'
}

export interface MaterialInvolvementReportData {
    _id?: string
    orderId?: string
    description?: string
    yearOfExecution?: string
    orderType?: OrderType
    orderExecutionType?: OrderExecutionType
    materials?: Array<MaterialForMaterialInvolvementReport>

}

export interface MaterialForMaterialInvolvementReport {
    materialId?: string
    quantityPerUnit?: string
    totalUnitsCount?: string
    totalQuantity?: string
    materialName?: string
}