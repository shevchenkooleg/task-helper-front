import cls from './SearchParentUnit.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ComboBox } from '@/shared/ui/Popups/ui/ComboBox/ComboBox';
import { Unit } from '@/entities/Unit';

interface SearchParentUnitProps {
    className?: string
    value?: string
    unitList?: Array<Unit>
    query?: string
    setQuery?: (value: string)=>void
    callback?: (value:Unit)=>void
}

export const SearchParentUnit = memo((props: SearchParentUnitProps) => {
    const { className , value, unitList, query = '', setQuery, callback } = props;

    const unitNamesList: Array<string> = [];
    unitList?.forEach(el=>el.unitName && unitNamesList.push(el.unitName));

    const setUnitItem = (itemName: string) => {
        const item = unitList?.filter(el=>el.unitName === itemName)[0];
        callback && item && callback(item);
    };

    return (
        <ComboBox
            className={classNames(cls.SearchParentUnit, {}, [className])}
            value={value}
            placeholder={''}
            query={query}
            setQuery={setQuery}
            items={unitNamesList}
            callback={setUnitItem}
        />
    );
});

SearchParentUnit.displayName = 'SearchParentUnit';