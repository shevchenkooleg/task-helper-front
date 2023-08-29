import { MaterialTabHeaderKeys } from '@/shared/const/materialTabHeaderKeys';
// TODO

// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { Dimension } from '@/entities/Dimension';


export const materialsTableTitleMapper: Record<MaterialTabHeaderKeys, string> = {
    [MaterialTabHeaderKeys.DIMENSION]: 'единица измерения',
    [MaterialTabHeaderKeys.FULL_VOLUME]: 'объем',
    [MaterialTabHeaderKeys.KSU_ID]: 'код КСУ НСИ',
    [MaterialTabHeaderKeys.UPP_ID]: 'код УПП',
    [MaterialTabHeaderKeys.MATERIAL_NAME]: 'Наименование',
};

export const materialsTableContentMapper: Record<Dimension, string> = {
    [Dimension.UNIT]: 'шт',
    [Dimension.M]: 'м',
    [Dimension.SM]: 'см',
    [Dimension.G]: 'г',
    [Dimension.KG]: 'кг',
    [Dimension.T]: 'т',
    [Dimension.L]: 'л',
    [Dimension.ML]: 'мл',
    [Dimension.NONE]: 'Укажите размерность материала',
};