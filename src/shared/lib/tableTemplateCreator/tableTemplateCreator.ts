//TODO

// eslint-disable-next-line path-import-validation-plugin/layer-imports
import { TableGridTemplate } from '@/shared/types/ui';
import { DefaultTableTemplatesObject } from '@/shared/const/defaultTableTamplates';

export function tableTemplateCreator (activeTabKeys: Array<string>, template: TableGridTemplate): string {
    const templateArr: string[] = [];
    activeTabKeys.map((tabKey)=>{
        templateArr.push(DefaultTableTemplatesObject[template][tabKey]);
    });
    const resultTemplate = templateArr.join(' ');
    return resultTemplate;
}