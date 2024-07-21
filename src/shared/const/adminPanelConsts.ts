
export enum AdminPanelUserTabHeaderKeys {
    USER_ID = '_id',
    USER_NAME = 'username',
    CREATED = 'created',
    ROLES = 'roles'
}

export enum AdminPanelMaintenanceTabHeaderKeys {
    USER_ID = '_id',
    FULL_NAME = 'fullName',
    SHORT_NAME = 'shortName',
    REPLACEABLE_MAINTENANCE = 'replaceableMaintenance',
    PERIODICITY = 'periodicity',
}

export enum AdminPanelView {
    USERS = 'users',
    // ORDERS = 'orders',
    MAINTENANCE = 'maintenance',
}

export const adminPanelButtonMapper: Record<AdminPanelView, string> = {
    [AdminPanelView.USERS]: 'Пользователи',
    // [AdminPanelView.ORDERS]: 'Карточки заказов',
    [AdminPanelView.MAINTENANCE]: 'Виды ТО',
};

export const adminPanelSelectorBtn = [
    { value: AdminPanelView.USERS, content:adminPanelButtonMapper.users },
    // { value: AdminPanelView.ORDERS, content:adminPanelButtonMapper.orders },
    { value: AdminPanelView.MAINTENANCE, content:adminPanelButtonMapper.maintenance },
];
