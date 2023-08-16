import { BillOfQuantitiesStatus, OrderDocumentsStatus, OrderStatus } from '../consts/orderConsts';

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
        status: OrderDocumentsStatus
    }
    consignmentNoteId?: {       // № накладной М11
        value: string,
        status: OrderDocumentsStatus
    }
    billOfQuantities?: {        // ВОР
        value: BillOfQuantitiesStatus
        status: OrderDocumentsStatus
    }
    KS2Id?: {                   // № КС-2
        value: string,
        status: OrderDocumentsStatus
    }
    writeOffActId?: {           // № Акта на списание
        value: string,
        status: OrderDocumentsStatus
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