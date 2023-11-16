import { memo } from 'react';
import { Material } from '@/entities/Material';
import { ComboBox } from '@/shared/ui/Popups/ui/ComboBox/ComboBox';
import cls from './SearchMaterial.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SearchMaterialProps {
    className?: string
    value?: string
    materialList?: Array<Material>
    query?: string
    setQuery?: (value: string)=>void
    callback?: (item:Material)=>void
}

export const SearchMaterial = memo((props: SearchMaterialProps) => {
    const { className, value, materialList, query = '', setQuery, callback } = props;

    const materialNamesList: Array<string> = [];
    materialList?.forEach(el=>el.materialName && materialNamesList.push(el.materialName));

    const setMaterialItem = (itemName: string) => {
        const item = materialList?.filter(el=>el.materialName === itemName)[0];
        callback && item && callback(item);
    };

    return (
        <ComboBox
            className={classNames(cls.SearchMaterial, {}, [className])}
            value={value}
            placeholder={'Название материала/Код КСУ/Код УПП'}
            query={query}
            setQuery={setQuery}
            items={materialNamesList}
            callback={setMaterialItem}
        />
    );
});

SearchMaterial.displayName = 'SearchMaterial';