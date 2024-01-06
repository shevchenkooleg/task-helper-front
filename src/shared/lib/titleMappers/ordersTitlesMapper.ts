import { OrderTabHeaderKeys } from '@/shared/const/orderConsts';

export const ordersTitlesMapper: Record<OrderTabHeaderKeys, string> = {
    [OrderTabHeaderKeys.SERIAL_NUMBER]: '№ п/п',
    [OrderTabHeaderKeys.ORDER_ID]: '№ заказа',
    [OrderTabHeaderKeys.EXECUTED_ID]: '№ выполнения',
    [OrderTabHeaderKeys.DESCRIPTION]: 'Оборудование',
    [OrderTabHeaderKeys.ORDER_STATUS]: 'Состояние заказа',
    [OrderTabHeaderKeys.CORRECTION_ID]: '№ корректировки',
    [OrderTabHeaderKeys.CONSIGNMENT_NOTE_ID]: '№ накладной М11',
    [OrderTabHeaderKeys.BILL_OF_QUANTITIES]: 'ВОР',
    [OrderTabHeaderKeys.KS2_ID]: '№ КС-2',
    [OrderTabHeaderKeys.WRITE_OFF_ACT_ID]: '№ акта на списание',
    [OrderTabHeaderKeys._ID]: '_id',
    [OrderTabHeaderKeys.USER_ID]: 'userId',
    [OrderTabHeaderKeys.__V]: '__v',
    [OrderTabHeaderKeys.MODIFIED]: 'Изменен',
    [OrderTabHeaderKeys.YEAR_OF_EXECUTION]: 'Год выполнения'
};