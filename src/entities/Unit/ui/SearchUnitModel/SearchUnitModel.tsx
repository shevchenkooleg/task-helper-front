import cls from './SearchUnitModel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { ComboBox } from '@/shared/ui/Popups/ui/ComboBox/ComboBox';
import { Unit } from '../..';
import { UnitModel } from '@/entities/UnitModel';

interface SearchUnitModelProps {
    className?: string
    value?: string
    modelList?: Array<UnitModel>
    query?: string
    setQuery?: (value: string)=>void
    callback?: (value:Unit)=>void
}

export const SearchUnitModel = memo((props: SearchUnitModelProps) => {
    const { className } = props;

    
    return (
        <ComboBox
            className={classNames(cls.SearchUnitModel, {}, [className])}
            // value={value}
            placeholder={''}
            query={'query'}
            // setQuery={setQuery}
            // items={unitNamesList}
            // callback={setUnitItem}
        />
    );
});

SearchUnitModel.displayName = 'SearchUnitModel';