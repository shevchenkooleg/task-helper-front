import { Order } from '@/entities/Order';

export enum OrderTabHeaderKeys {
    ORDER_ID ='orderId',
    EXECUTED_ID ='executeId',
    DESCRIPTION ='description',
    ORDER_STATUS ='orderStatus',
    CORRECTION_ID ='correctionId',
    CONSIGNMENT_NOTE_ID ='consignmentNoteId',
    BILL_OF_QUANTITIES ='billOfQuantities',
    KS2_ID ='KS2Id',
    WRITE_OFF_ACT_ID ='writeOffActId',
    MODIFIED ='modified',
    _ID ='_id',
    USER_ID = 'userId',
    __V = '__v',
}

export interface AddNewOrderSliceSchema {
    error: string
    isLoading: boolean
    newOrder: Order
}

