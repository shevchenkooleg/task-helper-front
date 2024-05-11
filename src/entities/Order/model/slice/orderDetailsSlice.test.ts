import { Order, OrderDetailsSliceSchema } from '../types/orderDetailsSliceSchema';
import { orderDetailsSliceActions, orderDetailsSliceReducer } from './orderDetailsSlice';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';
import { ExecutionStatus, OrderDocumentsStatus, OrderStatus } from '@/shared/const/orderConsts';
import { Dimension } from '@/entities/Dimension';
import { MaterialToOrderTab } from '@/entities/Material';

const mockOrderData: Order = {
    _id:'65c8677772eea89c1f7b0173',
    userId:'65ace5a2063bdf67412eefe4',
    orderId:'СО00-з11122',
    description:'КРУ-10 Блока №2',
    orderType:OrderType.CONTRACTING,
    orderExecutionType:OrderExecutionType.PLANNED,
    yearOfExecution:'2025',
    orderStatus:OrderStatus.NONE,
    modified:'2024-02-14T17:13:29.009Z',
    consignmentNotes: [
        {
            value: '1123214',
            status: OrderDocumentsStatus.AWAITING_SIGNING,
            _orderId: '65c8677772eea89c1f7b0173',
            _id: '65d6371a72eea89c1f7b0702',
        }
    ],
    materials: [
        {
            materialId:'659cf73e473cb449fddc7972',
            quantityPerUnit:'1',
            totalUnitsCount:'1',
            totalQuantity:'1',
            _id:'65c8680372eea89c1f7b01ea',
            materialName:'очиститель ABRO EC-533',
            KSUId:'543443',
            UPPId:'24/00312139',
            dimension:Dimension.UNIT,
            fullVolume:'1',
        }
    ],
    executions: [
        {
            value:'СО-0001',
            status:ExecutionStatus.TECHNICAL_CLOSED,
            _orderId:'65c8677772eea89c1f7b0173',
            _id:'65cbb07b72eea89c1f7b0507',
        },
        {
            value:'СО-0002',
            status:ExecutionStatus.EXECUTING,
            _orderId:'65c8677772eea89c1f7b0173',
            _id:'65cbb08972eea89c1f7b',
        }
    ],
    writeOffDocuments:[
        {
            value:'111',
            status:OrderDocumentsStatus.ON_CLEARANCE,
            _executionId:'65cbb07b72eea89c1f7b0507',
            _id:'65ccf4aa72eea89c1f7b053d',
        },
        {
            value:'222',
            status:OrderDocumentsStatus.ON_CLEARANCE,
            _executionId:'65cbb08972eea89c1f7b0519',
            _id:'65ccf4ae72eea89c1f7b0546',
        },
        {
            value:'333',
            status:OrderDocumentsStatus.ON_CLEARANCE,
            _executionId:'65cbb08972eea89c1f7b0519',
            _id:'65ccf4b172eea89c1f7b054f',
        }
    ],
    KS2Documents: [
        {
            value:'111',
            status:OrderDocumentsStatus.AWAITING_SIGNING,
            _executionId:'65cbb07b72eea89c1f7b0507',
            _id:'65cbb07e72eea89c1f7b',
        },
        {
            value:'222',
            status:OrderDocumentsStatus.WAITING_FOR_EC,
            _executionId:'65cbb07b72eea89c1f7b0507',
            _id:'65cceee572eea89c1f7b052b',
        }
    ],
    materialCorrections: [
        {
            value:'corr1',
            status:OrderDocumentsStatus.ON_CLEARANCE,
            _orderId:'65c8677772eea89c1f7b0173',
            _id:'65cbb07972eea89c1f7b04fe',
        },
        {
            value:'corr2',
            status:OrderDocumentsStatus.SUBMITTED_FOR_SIGNING,
            _orderId:'65c8677gjregrekgm0t34hterjho124r',
            _id:'65cbb079723458tuyhgijn854',
        },
    ],

};

describe('orderDetailsSlice.test', () => {
    test('test update form', () => {
        const state:DeepPartial<OrderDetailsSliceSchema> = {
            form: {}
        };

        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.updateOrderForm(mockOrderData)
        )).toEqual({ form: mockOrderData });
    });
    test('test updateOrderFormExecution', ()=>{
        const state: DeepPartial<OrderDetailsSliceSchema> = {
            form: {
                executions: [
                    {
                        value:'СО-0001',
                        status:ExecutionStatus.EXECUTING,
                        _orderId:'65c8677772eea89c1f7b0173',
                        _id:'65cbb07b72eea89c1f7b0507',
                    },
                ]
            }
        };

        if (mockOrderData.executions){
            expect(orderDetailsSliceReducer(
                state as OrderDetailsSliceSchema,
                orderDetailsSliceActions.updateOrderFormExecution(mockOrderData.executions[0])
            )).toEqual({
                form: {
                    executions: [
                        mockOrderData.executions[0]
                    ]
                }
            });
        }
    });
    test('test updateOrderFormCorrection', ()=>{
        const state = {
            form: {
                materialCorrections: [
                    {
                        _id:'65cbb079723458tuyhgijn854',
                    }
                ]
            }
        };
        if(mockOrderData.materialCorrections){
            expect(orderDetailsSliceReducer(
                state as OrderDetailsSliceSchema,
                orderDetailsSliceActions.updateOrderFormCorrection(mockOrderData.materialCorrections[1])
            )).toEqual({ form: { materialCorrections: [mockOrderData.materialCorrections[1]] } });
        }
    });
    test('test updateOrderConsignmentNote', ()=>{
        const state = {
            form: {
                consignmentNotes: [
                    { _id: '65d6371a72eea89c1f7b0702' },
                    { _id: '65d6371a72eea89c1f7b435t3y' }
                ]
            }
        };

        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.updateOrderConsignmentNote(mockOrderData.consignmentNotes![0])
        )).toEqual({ form: { consignmentNotes: [mockOrderData.consignmentNotes![0],  { _id: '65d6371a72eea89c1f7b435t3y' }],  } });
    });
    test('test updateExecutionKS2Card', ()=>{
        const state = {
            form: {
                KS2Documents: [
                    {
                        _id:'65cbb07e72eea89c1f7b',
                    },
                    {
                        _id:'65cceee572eea89c1f7b052b',
                    }
                ]
            }
        };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.updateExecutionKS2Card(mockOrderData.KS2Documents![0])
        )).toEqual({ form: { KS2Documents: [ mockOrderData.KS2Documents![0], { _id:'65cceee572eea89c1f7b052b', }] } });
        state.form.KS2Documents[0] = { ...mockOrderData.KS2Documents![0] };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.updateExecutionKS2Card(mockOrderData.KS2Documents![1])
        )).toEqual({ form: { KS2Documents: [ mockOrderData.KS2Documents![0], mockOrderData.KS2Documents![1]] } });
    });
    test('test updateExecutionWriteOffCard', ()=>{
        const state = {
            form: {
                writeOffDocuments:[
                    {
                        _id:'65ccf4aa72eea89c1f7b053d',
                    },
                    {
                        _id:'65ccf4ae72eea89c1f7b0546',
                    },
                    {
                        _id:'65ccf4b172eea89c1f7b054f',
                    }
                ]
            }
        };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.updateExecutionWriteOffCard(mockOrderData.writeOffDocuments![1])
        )).toEqual({ form: { writeOffDocuments: [ { _id:'65ccf4aa72eea89c1f7b053d' }, mockOrderData.writeOffDocuments![1], { _id:'65ccf4b172eea89c1f7b054f' }] } });
        state.form.writeOffDocuments[0] = { ...mockOrderData.writeOffDocuments![0] };
        state.form.writeOffDocuments[1] = { ...mockOrderData.writeOffDocuments![1] };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.updateExecutionWriteOffCard(mockOrderData.writeOffDocuments![2])
        )).toEqual({ form: { writeOffDocuments: mockOrderData.writeOffDocuments! } } );
    });
    test('test setEditMode', ()=>{
        const state: DeepPartial<OrderDetailsSliceSchema> = {
            editMode: false
        };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.setEditMode(true)
        )).toEqual({ editMode: true });});
    test('test rollBackForm', ()=>{
        const state: DeepPartial<OrderDetailsSliceSchema> = {
            form: {},
            order: mockOrderData
        };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.rollBackForm()
        )).toEqual({ form: mockOrderData, order: mockOrderData });});
    test('test addMaterialToOrder', ()=>{
        const state: DeepPartial<OrderDetailsSliceSchema> = {
            form: { materials: [] },
        };
        const newMaterial: MaterialToOrderTab = {
            materialId:'659cf73e473cb449fddc7972',
            quantityPerUnit:'1',
            totalUnitsCount:'1',
            totalQuantity:'1',
            _id:'65c8680372eea89c1f7b01ea',
            materialName:'очиститель ABRO EC-533',
            KSUId:'543443',
            UPPId:'24/00312139',
            dimension:Dimension.UNIT,
            fullVolume:'1',
        };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.addMaterialToOrder(newMaterial)
        )).toEqual({ form: { materials: [newMaterial] } });});
    test('test updateMaterialDataInOrder', ()=>{

        const newMaterial: MaterialToOrderTab = {
            materialId:'659cf73e473cb449fddc7972',
            quantityPerUnit:'1',
            totalUnitsCount:'1',
            totalQuantity:'1',
            _id:'65c8680372eea89c1f7b01ea',
            materialName:'очиститель ABRO EC-533',
            KSUId:'543443',
            UPPId:'24/00312139',
            dimension:Dimension.UNIT,
            fullVolume:'1',
        };

        const state: DeepPartial<OrderDetailsSliceSchema> = {
            form: { materials: [{ _id: 'qqc8680372eea89c1f7b01qq' }, { _id: '65c8680372eea89c1f7b01ea' }] },
        };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.updateMaterialDataInOrder(newMaterial)
        )).toEqual({ form: { materials: [{ _id: 'qqc8680372eea89c1f7b01qq' }, newMaterial] } });});
    test('test deleteMaterialInOrder', ()=>{

        const state: DeepPartial<OrderDetailsSliceSchema> = {
            form: { materials: [{ _id: 'qqc8680372eea89c1f7b01qq' }, { _id: '65c8680372eea89c1f7b01ea' }] },
        };
        expect(orderDetailsSliceReducer(
            state as OrderDetailsSliceSchema,
            orderDetailsSliceActions.deleteMaterialInOrder('qqc8680372eea89c1f7b01qq')
        )).toEqual({ form: { materials: [{ _id: '65c8680372eea89c1f7b01ea' }] } });});
});