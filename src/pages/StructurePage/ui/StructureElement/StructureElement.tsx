import cls from './StructureElement.module.scss';
import { memo, useCallback } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Unit, UnitCard } from '../../../../entities/Unit';
import { getUnitList } from '@/features/getMainParentUnits';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface StructureElementProps {
    className?: string
    data: Unit[]
    structure?: Record<string, Unit[]>
}

export const StructureElement = memo((props: StructureElementProps) => {

    const { data , structure } = props;
    const dispatch = useAppDispatch();



    const onElementClick = useCallback((parentId: string) => {
        dispatch(getUnitList({ 'parentId': parentId ?? '' }));
    },[dispatch]);



    const onUnitCardClick = (unitId: string) => {
        onElementClick(unitId);
    };

    return (
        <VStack align={'start'} className={cls.StructureElement} justify={'start'} max>
            {data?.map((unit)=>{

                const childKeysList = (structure && Object.keys(structure).filter(el=>el===unit._id)) ?? [];

                return (
                    <VStack key={unit._id} max>
                        <UnitCard unitData={unit} callback={onUnitCardClick}/>
                        {
                            childKeysList && childKeysList.length
                                ? <StructureElement
                                    data={structure ? structure[childKeysList.filter(el=>unit._id === el)[0]] : []}
                                    structure={structure}
                                />
                                : null
                        }
                    </VStack>
                );
            })}
        </VStack>
    );
});

StructureElement.displayName = 'StructureElement';