import { OrderTabHeaderKeys } from './orderConsts';
import { MaterialInOrderTabHeaderKeys, MaterialTabHeaderKeys } from './materialTabHeaderKeys';
import { AdminPanelTabHeaderKeys } from './adminPanelConsts';

export const DefaultTableTemplatesObject: Record<string, Record<string, string>> = {
    ['orderTemplate'] : {
        [OrderTabHeaderKeys.SERIAL_NUMBER]: '1fr',
        [OrderTabHeaderKeys.ORDER_ID]: '3fr',
        [OrderTabHeaderKeys.EXECUTED_ID]: '3fr',
        [OrderTabHeaderKeys.DESCRIPTION]: '12fr',
        [OrderTabHeaderKeys.ORDER_STATUS]: '3fr',
        [OrderTabHeaderKeys.CORRECTION_ID]: '3fr',
        [OrderTabHeaderKeys.CONSIGNMENT_NOTE_ID]: '3fr',
        [OrderTabHeaderKeys.BILL_OF_QUANTITIES]: '3fr',
        [OrderTabHeaderKeys.KS2_ID]: '3fr',
        [OrderTabHeaderKeys.WRITE_OFF_ACT_ID]: '3fr',
        [OrderTabHeaderKeys.YEAR_OF_EXECUTION]: '3fr',
        [OrderTabHeaderKeys.MODIFIED]: '3fr',
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
        [AdminPanelTabHeaderKeys.USER_ID]: '1fr',
        [AdminPanelTabHeaderKeys.USER_NAME]: '1fr',
        [AdminPanelTabHeaderKeys.CREATED]: '1fr',
        [AdminPanelTabHeaderKeys.ROLES]: '1fr',
    },
};