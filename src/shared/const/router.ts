export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    // PROFILE = 'profile',
    ORDERS = 'orders',
    ORDER_DETAILS = 'order_details',
    // ORDER_CREATE = 'order_create',
    // ORDER_EDIT = 'order_edit',
    MATERIALS = 'materials',
    MATERIAL_DETAILS = 'material_details',
    ADMIN_PANEL = 'admin_panel',
    REPORTS = 'reports',
    USER_PROFILE = 'user_profile',
    STRUCTURE = 'structure',
    // TOTAL_VOLUME_MATERIAL_REPORT = 'total_volume_material_report',
    // MATERIAL_INVOLVEMENT_REPORT = 'material_involvement_report',
    // FORBIDDEN_PAGE = 'forbidden_page',
    // //last
    NOT_FOUND = 'notFoundPage'
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (userId: string) => `/profile/${userId}`;
export const getRouteOrders = () => '/orders';
export const getRouteStructure = () => '/structure';
export const getRouteOrderDetails= (orderId: string) => `/orders/${orderId}`;
export const getRouteOrderCreate = () => 'orders/new';
export const getRouteOrderEdit = (orderId: string) => `/orders/${orderId}/edit`;
export const getRouteMaterials = () => '/materials';
export const getRouteMaterialDetails= (materialId: string) => `/materials/${materialId}`;
export const getRouteAdminPanel = () => '/admin';
export const getRouteReports = (contentType: string) => `/reports/${contentType}`;
export const getRouteUserProfile = ()=>'/profile';
// export const getRouteTotalVolumeMaterialReport = () => '/reports/totalVolumeMaterialReport';
// export const getRouteMaterialInvolvementReport = () => '/reports/materialInvolvementReport';

export const getRouteForbiddenPage = () => '/forbidden';
