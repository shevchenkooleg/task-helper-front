export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    // PROFILE = 'profile',
    ORDERS = 'orders',
    ORDER_DETAILS = 'order_details',
    // ORDER_CREATE = 'order_create',
    // ORDER_EDIT = 'order_edit',
    ADMIN_PANEL = 'admin_panel',
    // FORBIDDEN_PAGE = 'forbidden_page',
    TEST = 'test',
    // //last
    NOT_FOUND = 'notFoundPage'
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (userId: string) => `/profile/${userId}`;
export const getRouteOrders = () => '/orders';
export const getRouteOrderDetails= (orderId: string) => `/orders/${orderId}`;
export const getRouteOrderCreate = () => 'orders/new';
export const getRouteOrderEdit = (orderId: string) => `/orders/${orderId}/edit`;
export const getRouteAdminPanel = () => 'admin';
export const getRouteForbiddenPage = () => 'forbidden';