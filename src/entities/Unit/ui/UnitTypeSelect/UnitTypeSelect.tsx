import cls from './UnitTypeSelect.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { MListBox } from '@/shared/ui/Popups';
import { ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { UnitType, unitTypeMapper } from '@/shared/const/unitConsts';

interface UnitTypeSelectProps {
    className?: string
    onChange?: (value: UnitType) => void
    value?: UnitType
    readOnly?: boolean
    size?: ButtonSize
    buttonTheme?: ButtonTheme
    width?: string
}


const unitTypeOptions = [
    { value: UnitType.EQUIPMENT, content: unitTypeMapper.equipment },
    { value: UnitType.TECHNICAL_PLACE, content: unitTypeMapper.technicalPlace },
];

export const UnitTypeSelect = memo((props: UnitTypeSelectProps) => {
    const {
        className, onChange,
        readOnly, value, size,
        buttonTheme, width
    } = props;

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as UnitType);
    }, [onChange]);

    value && console.log('value ', unitTypeMapper[value]);

    return (
        <MListBox
            className={classNames(cls.UnitTypeSelect, {}, [className])}
            onChange={onChangeHandler}
            items={unitTypeOptions}
            value={value ? unitTypeMapper[value] : ''}
            defaultValue={'Укажите состояние документа'}
            readOnly={readOnly}
            direction={'bottom right'}
            size={size}
            buttonTheme={buttonTheme}
            // label={'Состояние документа:'}
            labelMapper={unitTypeMapper}
            width={width}
        />
    );
});

UnitTypeSelect.displayName = 'UnitTypeSelect';