// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { Unit } from '@/entities/Unit';

export const structureTreeShaker = function shaker (structure: Record<string, Unit[]>, unitId: string, resultArr: string[]) {

    if (structure[unitId]) {
        structure[unitId].forEach(el=>{
            el._id && structure[el._id] && resultArr.push(el._id);
            el._id && shaker(structure, el._id, resultArr);
        });
    }
    return resultArr;
};

