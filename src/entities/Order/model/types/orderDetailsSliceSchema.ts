import { ExecutionStatus, OrderDocumentsStatus, OrderStatus } from '@/shared/const/orderConsts';
import { MaterialToOrderTab } from '@/entities/Material';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';

export interface Order {
    _id?: string
    userId?: string
    modified?: string
    orderId?: string
    description?: string
    orderType?: OrderType
    orderExecutionType?: OrderExecutionType
    yearOfExecution?: string
    orderStatus?: OrderStatus
    materialCorrections?: Array<OrderMaterialCorrectionInterface>
    consignmentNotes?: Array<OrderConsignmentNoteInterface>
    executions?: Array<OrderExecutionInterface>
    // billOfQuantities?: {        // ВОР
    //     value: BillOfQuantitiesStatus
    //     status: OrderDocumentsStatus
    // }
    KS2Documents?: Array<KS2DocumentInterface>
    writeOffDocuments?: Array<WriteOffDocumentInterface>
    materials?: Array<MaterialToOrderTab>
}

export interface OrderMaterialCorrectionInterface {            // Корректировка характеристик материала
    value: string
    status: OrderDocumentsStatus
    _orderId: string
    _id: string
}

export interface OrderConsignmentNoteInterface {       // Накладная М11
    value: string
    status: OrderDocumentsStatus
    _orderId: string
    _id: string
}

export interface OrderExecutionInterface {
    value: string
    status: ExecutionStatus
    _orderId: string
    _id: string
}

export interface KS2DocumentInterface {                   // КС-2
    value: string
    status: OrderDocumentsStatus
    _executionId: string
    _id: string
}

export interface WriteOffDocumentInterface {           // Акт на списание
    value: string
    status: OrderDocumentsStatus
    _executionId: string
    _id: string
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