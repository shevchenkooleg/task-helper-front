import cls from './DimensionSelect.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { Dimension } from '../../model/types/dimension';
import { dimensionTitlesMapper } from '../../model/services/dimentionsTitlesMapper/dimentionsTitlesMapper';

interface DimensionSelectProps {
    className?: string
    value?: string
    onChange?: (dimension: Dimension) => void
    readOnly?: boolean
}

const options = [
    { value: Dimension.KG, content: dimensionTitlesMapper.kg },
    { value: Dimension.G, content: dimensionTitlesMapper.g },
    { value: Dimension.T, content: dimensionTitlesMapper.t },
    { value: Dimension.L, content: dimensionTitlesMapper.l },
    { value: Dimension.ML, content: dimensionTitlesMapper.ml },
    { value: Dimension.M, content: dimensionTitlesMapper.m },
    { value: Dimension.SM, content: dimensionTitlesMapper.sm },
    { value: Dimension.UNIT, content: dimensionTitlesMapper.unit },
];

export const DimensionSelect = memo((props: DimensionSelectProps) => {
    const { className, value, readOnly, onChange } = props;

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Dimension);
    }, [onChange]);

    return (
        <ListBox
            className={classNames(cls.DimensionSelect, {}, [className])}
            onChange={onChangeHandler}
            items={options}
            value={value}
            defaultValue={'Укажите размерность'}
            readOnly={readOnly}
            direction={'top left'}
            label={'Размерность материала'}
            labelMapper={dimensionTitlesMapper}
        />
    );
});

DimensionSelect.displayName = 'DimensionSelect';