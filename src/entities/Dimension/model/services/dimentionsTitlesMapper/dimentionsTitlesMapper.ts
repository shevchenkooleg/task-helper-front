// eslint-disable-next-line path-import-validation-plugin/layer-imports

import { Dimension } from '../../types/dimension';

export const dimensionTitlesMapper: Record<Dimension, string> = {
    [Dimension.G]: 'гр',
    [Dimension.KG]: 'кг',
    [Dimension.T]: 'т',
    [Dimension.L]: 'л',
    [Dimension.ML]: 'мл',
    [Dimension.M]: 'м',
    [Dimension.SM]: 'см',
    [Dimension.UNIT]: 'ед',
    [Dimension.NONE]: 'н/а',
};