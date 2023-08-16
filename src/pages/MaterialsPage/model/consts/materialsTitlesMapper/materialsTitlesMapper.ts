import { MaterialTabHeaderKeys } from '@/features/addNewMaterial';

export const materialsTitlesMapper: Record<MaterialTabHeaderKeys, string> = {
    [MaterialTabHeaderKeys.DIMENSION]: 'единица измерения',
    [MaterialTabHeaderKeys.FULL_VOLUME]: 'объем',
    [MaterialTabHeaderKeys.KSU_ID]: 'код КСУ',
    [MaterialTabHeaderKeys.MATERIAL_NAME]: 'Наименование',
};