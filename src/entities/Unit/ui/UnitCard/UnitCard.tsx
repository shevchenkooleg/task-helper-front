import cls from './UnitCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Unit } from '../..';
import { HStack } from '@/shared/ui/Stack';

interface UnitCardProps {
    className?: string
    unitData: Unit
    callback: (unitId: string)=>void
}

export const UnitCard = memo((props: UnitCardProps) => {
    const { className , unitData , callback } = props;
    const onElementClick = () => {unitData._id && callback(unitData._id);};

    const nestingLevelStringCreator = (nestingLevel: number)=>{
        return `nesting-${nestingLevel}`;
    };

    const nestingString = nestingLevelStringCreator(Number(unitData.nestingLevel));

    const mods = {
        [cls[String(nestingString)]]:Boolean(nestingString)
    };

    console.log('nestingString ', nestingString);

    return (
        <HStack max className={classNames(cls.UnitCard, mods, [className])}>
            <div onClick={onElementClick} className={cls.element}>
                {unitData.unitName}
            </div>
        </HStack>
    );
});

UnitCard.displayName = 'UnitCard';