import { OrderTabHeaderKeys } from '@/shared/const/orderConsts';

export const ordersTitlesMapper: Record<OrderTabHeaderKeys, string> = {
    [OrderTabHeaderKeys.SERIAL_NUMBER]: '№ п/п',
    [OrderTabHeaderKeys.ORDER_ID]: '№ заказа',
    [OrderTabHeaderKeys.EXECUTIONS]: 'Выполнения',
    [OrderTabHeaderKeys.DESCRIPTION]: 'Оборудование',
    [OrderTabHeaderKeys.ORDER_STATUS]: 'Состояние заказа',
    [OrderTabHeaderKeys.MATERIAL_CORRECTIONS]: 'Корректировки',
    [OrderTabHeaderKeys.CONSIGNMENT_NOTES]: 'М11',
    // [OrderTabHeaderKeys.BILL_OF_QUANTITIES]: 'ВОР',
    [OrderTabHeaderKeys.KS2_DOCUMENTS]: 'КС-2',
    [OrderTabHeaderKeys.WRITE_OFF_DOCUMENTS]: 'Акты на списание',
    [OrderTabHeaderKeys._ID]: '_id',
    [OrderTabHeaderKeys.USER_ID]: 'userId',
    [OrderTabHeaderKeys.__V]: '__v',
    [OrderTabHeaderKeys.MODIFIED]: 'Изменен',
    [OrderTabHeaderKeys.YEAR_OF_EXECUTION]: 'Год выполнения'
};