/*
            Документ на оформлении - on_clearance - ON_CLEARANCE
            Документ ожидает отправку в СЦ - waiting_for_EC - WAITING_FOR_EC
            Документ в СЦ на согласовании - agreement_in_EC - AGREEMENT_IN_EC
            Документ распечатан, виза СЦ, ожидает подписания - awaiting_signing - AWAITING_SIGNING
            Документ передан для подписания в АБК - submitted_for_signing - SUBMITTED_FOR_SIGNING
            Документ подписан, готов к передаче в ОЦО - ready_to_transfer - READY_TO_TRANSFER
            Документ загружен в ТТС - uploaded_to_TTS - UPLOADED_TO_TTS
* */


export enum OrderStatus {
    NONE = 'none',
    ISSUED = 'issued',
    WAITING_FOR_REQUEST = 'waiting_for_request',
    EXECUTING = 'executing',
    AGREEMENT = 'agreement',
    WAITING_FOR_TECHNICAL_CLOSING = 'waiting_for_technical_closing',
    TECHNICAL_CLOSED = 'technical_closed',
}

export enum OrderDocumentsStatus {
    ON_CLEARANCE = 'on_clearance',
    WAITING_FOR_EC = 'waiting_for_EC',
    AGREEMENT_IN_EC = 'agreement_in_EC',
    AWAITING_SIGNING = 'awaiting_signing',
    SUBMITTED_FOR_SIGNING = 'submitted_for_signing',
    READY_TO_TRANSFER = 'ready_to_transfer',
    UPLOADED_TO_TTS = 'uploaded_to_TTS',
}

export enum BillOfQuantitiesStatus {
    LOADED = 'loaded',
    NOT_LOADED = 'not_loaded'
}


export const orderDocumentsStatusMapper: Record<OrderDocumentsStatus, string> = {
    [OrderDocumentsStatus.ON_CLEARANCE]: 'Документ на оформлении',
    [OrderDocumentsStatus.WAITING_FOR_EC]: 'Документ ожидает отправку в СЦ',
    [OrderDocumentsStatus.AGREEMENT_IN_EC]: 'Документ в СЦ на согласовании',
    [OrderDocumentsStatus.AWAITING_SIGNING]: 'Документ распечатан, виза СЦ, ожидает подписания',
    [OrderDocumentsStatus.SUBMITTED_FOR_SIGNING]: 'Документ передан для подписания в АБК',
    [OrderDocumentsStatus.READY_TO_TRANSFER]: 'Документ подписан, готов к передаче в ОЦО',
    [OrderDocumentsStatus.UPLOADED_TO_TTS]: 'Документ загружен в ТТС',
};
export const orderStatusMapper: Record<OrderStatus, string> = {
    [OrderStatus.ISSUED]: 'На оформлении',
    [OrderStatus.TECHNICAL_CLOSED]: 'Технически закрыт',
    [OrderStatus.EXECUTING]: 'Выполнение',
    [OrderStatus.AGREEMENT]: 'На согласовании',
    [OrderStatus.WAITING_FOR_REQUEST]: 'Ожидает запроса в ОРТПиР',
    [OrderStatus.WAITING_FOR_TECHNICAL_CLOSING]: 'Ожидает технического закрытия',
    [OrderStatus.NONE]: 'Статус не указан',
};

export const billOfQuantitiesStatusMapper: Record<BillOfQuantitiesStatus, string> = {
    [BillOfQuantitiesStatus.LOADED]: 'Загружен в ТОРО',
    [BillOfQuantitiesStatus.NOT_LOADED]: 'Не загружен В ТОРО'
};