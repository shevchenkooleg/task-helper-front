export enum OrderStatus {
    NONE = 'none',
    ISSUED = 'issued',
    WAITING_FOR_REQUEST = 'waiting_for_request',
    EXECUTING = 'executing',
    AGREEMENT = 'agreement',
    WAITING_FOR_TECHNICAL_CLOSING = 'waiting_for_technical_closing',
    TECHNICAL_CLOSED = 'technical_closed',
}

export enum BillOfQuantities {
    NOT_LOADED = 'not_loaded',
    LOADED = 'loaded',
}

export interface Order {
    _id?: string
    userId?: string
    modified?: string
    orderId?: string
    executeId?: string
    description?: string
    orderStatus?: OrderStatus
    correctionId?: string
    consignmentNoteId?: string
    billOfQuantities?: BillOfQuantities
    KS2Id?: string
    writeOffActId?: string
}

export interface OrderDetailsSliceSchema {
    order: Order
    error?: string
    isLoading: boolean
}