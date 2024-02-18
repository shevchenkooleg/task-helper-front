import { StateSchema } from '@/app/providers/StoreProvider';
import { Order } from '@/entities/Order';
import { OrderExecutionType, OrderType } from '@/shared/const/addNewOrderConsts';
import {
    getMaterialInvolvementReportData
} from './getMaterialInvolvementReportData';

describe('getMaterialInvolvementReportData.test', () => {

    const mockedData: Array<Order> = [
        {
            _id:'65ad1c6822fereherfeabda1dfg559d3a',
            orderId: 'СО00-э00001',
            description:'РЗиА ГТУ-11',
            yearOfExecution:'2025',
            orderType: OrderType.INDEPENDENT,
            orderExecutionType: OrderExecutionType.PLANNED,
            materials: [
                {
                    materialId:'64ed82hrjetjhhb3d21a64e4a0e01ce5',
                    quantityPerUnit:'1',
                    totalUnitsCount:'1',
                    totalQuantity:'1',
                    _id:'65b006efeethjytge466d1d3074bc28',
                    materialName:'лента ПВХ электроизоляционная с липким слоем 19х0,18ммх20м -50+50С зеленый',
                }
            ]
        }
    ];

    const state: DeepPartial<StateSchema> = {
        reports: {
            materialInvolvementReport: mockedData
        }
    };

    test('should return MaterialInvolvementReportData', () => {
        expect(getMaterialInvolvementReportData(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', () => {
        expect(getMaterialInvolvementReportData({} as StateSchema)).toEqual(undefined);
    });
});