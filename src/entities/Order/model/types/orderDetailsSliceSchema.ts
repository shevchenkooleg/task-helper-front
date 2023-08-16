import { BillOfQuantitiesStatus, orderDocumentsStatus, OrderStatus } from '../consts/orderConsts';

export interface Order {
    _id?: string
    userId?: string
    modified?: string
    orderId?: string
    executeId?: string
    description?: string
    orderStatus?: OrderStatus
    correctionId?: {            // № корректировки
        value: string,
        status: orderDocumentsStatus
    }
    consignmentNoteId?: {       // № накладной М11
        value: string,
        status: orderDocumentsStatus
    }
    billOfQuantities?: {        // ВОР
        value: BillOfQuantitiesStatus
        status: orderDocumentsStatus
    }
    KS2Id?: {                   // № КС-2
        value: string,
        status: orderDocumentsStatus
    }
    writeOffActId?: {           // № Акта на списание
        value: string,
        status: orderDocumentsStatus
    }
    yearOfExecution?: string
}

export interface OrderDetailsSliceSchema {
    order: Order
    form: Order
    error?: string
    isLoading: boolean
    editMode: boolean
}



/*
            Документ на оформлении - on_clearance - ON_CLEARANCE
            Документ ожидает отправку в СЦ - waiting_for_EC - WAITING_FOR_EC
            Документ в СЦ на согласовании - agreement_in_EC - AGREEMENT_IN_EC
            Документ распечатан, виза СЦ, ожидает подписания - awaiting_signing - AWAITING_SIGNING
            Документ передан для подписания в АБК - submitted_for_signing - SUBMITTED_FOR_SIGNING
            Документ подписан, готов к передаче в ОЦО - ready_to_transfer - READY_TO_TRANSFER
            Документ загружен в ТТС - uploaded_to_TTS - UPLOADED_TO_TTS
* */