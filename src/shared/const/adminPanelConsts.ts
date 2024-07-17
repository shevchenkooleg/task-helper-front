
export enum AdminPanelTabHeaderKeys {
    USER_ID = '_id',
    USER_NAME = 'username',
    CREATED = 'created',
    ROLES = 'roles'
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