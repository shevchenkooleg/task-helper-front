import { materialsTableTitleMapper } from './materialsTableMappers';
// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { MaterialInOrderTabHeaderKeys, MaterialInOrderType } from '@/shared/const/materialTabHeaderKeys';

export const materialsInOrderTitlesMapper: Record<MaterialInOrderType, string> = {
    ...materialsTableTitleMapper,
    [MaterialInOrderTabHeaderKeys.QUANTITY_PER_UNIT]: 'количество на ед.оборудования',
    [MaterialInOrderTabHeaderKeys.TOTAL_UNITS_COUNT]: 'общее количество ед.оборудования',
    [MaterialInOrderTabHeaderKeys.TOTAL_QUANTITY]: 'общее количество материала',
};