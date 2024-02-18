import { getTotalVolumeMaterialReportData } from '../../..';
import { StateSchema } from '@/app/providers/StoreProvider';
import { MaterialToReportTab } from '@/entities/Material';
import { Dimension } from '@/entities/Dimension';

describe('getTotalVolumeMaterialReportData.test', () => {

    const mockedData: Array<MaterialToReportTab> = [
        {
            _id:'64ed82b3d21a64ethrtj4a0e01ce5',
            materialName:'лента ПВХ электроизоляционная с липким слоем 19х0,18ммх20м -50+50С зеленый',
            KSUId:'489134',
            dimension:Dimension.M,
            fullVolume:'20',
            UPPId:'00243615675',
            totalVolume:'1',
        },
        {
            _id:'659cf73e473cb44egerh9fddc7972',
            materialName:'очиститель ABRO EC-533',
            KSUId:'853235',
            UPPId:'00312132539',
            dimension:Dimension.UNIT,
            fullVolume:'1',
            totalVolume:'1',
        }
    ];

    const state: DeepPartial<StateSchema> = {
        reports: {
            totalVolumeMaterialReport: mockedData
        }
    };

    test('should return totalVolumeMaterialReportData', () => {
        expect(getTotalVolumeMaterialReportData(state as StateSchema)).toEqual(mockedData);
    });
    test('must return with empty state', () => {
        expect(getTotalVolumeMaterialReportData({}as StateSchema)).toEqual(undefined);
    });
});