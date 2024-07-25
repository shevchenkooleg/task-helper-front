import cls from './UnitStructureCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { UnitDetailsSliceActions } from '../../model/slice/unitDetailsSlice';
import { HStack } from '@/shared/ui/Stack';
import { Icon } from '@/shared/ui/Icon';
import ArrowDownIcon from '@/shared/assets/icons/ArrowDown.svg';
import ArrowUpIcon from '@/shared/assets/icons/ArrowUp.svg';
import ReadMoreIcon from '@/shared/assets/icons/ReadMoreIcon.svg';
import AddIcon from '@/shared/assets/icons/AddCircleIcon2.svg';
import { UnitType } from '@/shared/const/unitConsts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Unit } from '../../model/types/unitDetailsTypes';

interface UnitCardProps {
    className?: string
    unitData: Unit
    moreDataCallback?: (unitId: string)=>void
    lessDataCallback?: (unitId: string)=>void
    fastAddCallback?: (unitData: Unit)=>void
}

export const UnitStructureCard = memo((props: UnitCardProps) => {
    const { className , unitData , moreDataCallback ,
        lessDataCallback, fastAddCallback } = props;

    const dispatch = useAppDispatch();
    const [isChildrenShow, setIsChildrenShow] = useState(false);


    const onElementClick = () => {
        if (isChildrenShow){
            console.log('click on element with id ', unitData._id);
            unitData._id && lessDataCallback && lessDataCallback(unitData._id);
            setIsChildrenShow(false);
            return;
        }
        unitData._id && moreDataCallback && moreDataCallback(unitData._id);
        setIsChildrenShow(true);
    };


    const nestingLevelStringCreator = (nestingLevel: number)=>{
        return `nesting-${nestingLevel}`;
    };

    const nestingString = nestingLevelStringCreator(Number(unitData.nestingLevel));

    const mods = {
        [cls[String(nestingString)]]:Boolean(nestingString)
    };

    const onAddBtnClick = () => {
        fastAddCallback && fastAddCallback(unitData);
    };

    const onReadMoreClick = (unitData: Unit) => {
        dispatch(UnitDetailsSliceActions.setUnitDetailsData(unitData));
    };

    console.log('nestingString ', nestingString);

    if (unitData.unitType === UnitType.EQUIPMENT) {
        return (
            <HStack className={classNames(cls.UnitCard, mods, [className])} justify={'between'} gap={'32px'}>
                <div onClick={onElementClick} className={cls.element}>
                    {unitData.unitName}
                </div>
                <Icon Svg={ReadMoreIcon} height={'24px'} className={cls.icon} onClick={()=>onReadMoreClick(unitData)}/>
            </HStack>
        );
    }

    return (
        <HStack className={classNames(cls.UnitCard, mods, [className])} justify={'between'} gap={'32px'}>
            <HStack align={'center'} max >
                <div onClick={onElementClick} className={`${cls.element} ${cls.pointer}`}>
                    {unitData.unitName}
                </div>
                <Icon Svg={AddIcon} onClick={onAddBtnClick} height={'24px'} className={cls.icon}/>
            </HStack>
            <HStack>
                {isChildrenShow
                    ? <Icon Svg={ArrowDownIcon}/>
                    : <Icon Svg={ArrowUpIcon}/>
                }
            </HStack>
        </HStack>
    );
});

UnitStructureCard.displayName = 'UnitStructureCard';