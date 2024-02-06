export { type OrdersPageSchema } from './model/types/ordersPage';
export { OrdersPageAsync as OrdersPage } from './ui/OrdersPage/OrdersPageAsync';
export { getOrdersPageIsInit } from './model/selectors/getOrdersPageIsInit/getOrdersPageIsInit';
export { ordersPageSliceActions, ordersPageSliceReducer } from './model/slice/ordersPageSlice';
export { getOrdersPageTableKeys } from './model/selectors/getOrdersPageTableKeys/getOrdersPageTableKeys';

