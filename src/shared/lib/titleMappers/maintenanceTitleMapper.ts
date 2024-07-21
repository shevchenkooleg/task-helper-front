import { AdminPanelMaintenanceTabHeaderKeys } from '@/shared/const/adminPanelConsts';

export const maintenanceTabTitlesMapper: Record<AdminPanelMaintenanceTabHeaderKeys, string> = {
    [AdminPanelMaintenanceTabHeaderKeys.USER_ID]: 'Идентификационный номер ТО',
    [AdminPanelMaintenanceTabHeaderKeys.FULL_NAME]: 'Полное наименование',
    [AdminPanelMaintenanceTabHeaderKeys.SHORT_NAME]: 'Краткое наименование',
    [AdminPanelMaintenanceTabHeaderKeys.PERIODICITY]: 'Периодичность',
    [AdminPanelMaintenanceTabHeaderKeys.REPLACEABLE_MAINTENANCE]: 'Заменяет',
};