import { OrderTabHeaderKeys } from './orderConsts';
import { MaterialInOrderTabHeaderKeys, MaterialTabHeaderKeys } from './materialTabHeaderKeys';
import { AdminPanelMaintenanceTabHeaderKeys, AdminPanelUserTabHeaderKeys } from './adminPanelConsts';
import { TotalVolumeMaterialReportKeys } from './reportConsts';

export const DefaultTableTemplatesObject: Record<string, Record<string, string>> = {
    ['orderTemplate'] : {
        [OrderTabHeaderKeys.SERIAL_NUMBER]: '1fr',
        [OrderTabHeaderKeys.ORDER_ID]: '3fr',
        [OrderTabHeaderKeys.EXECUTIONS]: '3fr',
        [OrderTabHeaderKeys.DESCRIPTION]: '14fr',
        [OrderTabHeaderKeys.ORDER_STATUS]: '4fr',
        [OrderTabHeaderKeys.MATERIAL_CORRECTIONS]: '3fr',
        [OrderTabHeaderKeys.CONSIGNMENT_NOTES]: '3fr',
        // [OrderTabHeaderKeys.BILL_OF_QUANTITIE]: '3fr',
        [OrderTabHeaderKeys.KS2_DOCUMENTS]: '3fr',
        [OrderTabHeaderKeys.WRITE_OFF_DOCUMENTS]: '3fr',
        [OrderTabHeaderKeys.YEAR_OF_EXECUTION]: '3fr',
        [OrderTabHeaderKeys.MODIFIED]: '4fr',
    },
    ['materialTemplate']: {
        [MaterialTabHeaderKeys.MATERIAL_NAME]: '6fr',
        [MaterialTabHeaderKeys.UPP_ID]: '1fr',
        [MaterialTabHeaderKeys.KSU_ID]: '1fr',
        [MaterialTabHeaderKeys.DIMENSION]: '1fr',
        [MaterialTabHeaderKeys.FULL_VOLUME]: '1fr',
        [MaterialInOrderTabHeaderKeys.QUANTITY_PER_UNIT]: '1fr',
        [MaterialInOrderTabHeaderKeys.TOTAL_UNITS_COUNT]: '1fr',
        [MaterialInOrderTabHeaderKeys.TOTAL_QUANTITY]: '1fr',
    },
    ['adminPanelUsersTemplate']: {
        [AdminPanelUserTabHeaderKeys.USER_ID]: '1fr',
        [AdminPanelUserTabHeaderKeys.USER_NAME]: '1fr',
        [AdminPanelUserTabHeaderKeys.CREATED]: '1fr',
        [AdminPanelUserTabHeaderKeys.ROLES]: '1fr',
    },
    ['adminPanelMaintenanceTemplate']: {
        [AdminPanelMaintenanceTabHeaderKeys.USER_ID]: '1fr',
        [AdminPanelMaintenanceTabHeaderKeys.FULL_NAME]: '1fr',
        [AdminPanelMaintenanceTabHeaderKeys.SHORT_NAME]: '1fr',
        // [AdminPanelMaintenanceTabHeaderKeys.REPLACEABLE_MAINTENANCE]: '1fr',
        // [AdminPanelMaintenanceTabHeaderKeys.PERIODICITY]: '1fr',
    },
    ['structurePageMaintenanceTemplate']: {
        [AdminPanelMaintenanceTabHeaderKeys.FULL_NAME]: '1fr',
        [AdminPanelMaintenanceTabHeaderKeys.SHORT_NAME]: '1fr',
        [AdminPanelMaintenanceTabHeaderKeys.REPLACEABLE_MAINTENANCE]: '1fr',
        [AdminPanelMaintenanceTabHeaderKeys.PERIODICITY]: '1fr',
    },
    ['totalVolumeMaterialReportTemplate']: {
        [TotalVolumeMaterialReportKeys.MATERIAL_NAME]: '3fr',
        [TotalVolumeMaterialReportKeys.UPP_ID]: '1fr',
        [TotalVolumeMaterialReportKeys.KSU_ID]: '1fr',
        [TotalVolumeMaterialReportKeys.TOTAL_VOLUME]: '2fr',
        [TotalVolumeMaterialReportKeys.DIMENSION]: '1fr',
        [TotalVolumeMaterialReportKeys.FULL_VOLUME]: '1fr',
        [TotalVolumeMaterialReportKeys._ID]: '2fr',
        [TotalVolumeMaterialReportKeys.__V]: '1fr',
    },
    ['materialInvolvementReportTemplate']: {
        [OrderTabHeaderKeys.SERIAL_NUMBER]: '1fr',
        [OrderTabHeaderKeys.ORDER_ID]: '2fr',
        [OrderTabHeaderKeys.DESCRIPTION]: '5fr',
        [OrderTabHeaderKeys.YEAR_OF_EXECUTION]: '1fr',
        ['materials']: '10fr'
    }
};