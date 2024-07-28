import cls from './StructureElements.module.scss';
import { memo, useCallback } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Unit, UnitStructureCard } from '@/entities/Unit';
import { getUnitList } from '@/features/getMainParentUnits';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StructurePageActions } from '../../model/slice/structurePageSlice';


interface StructureElementsProps {
    className?: string
    data: Unit[]
    structure?: Record<string, Unit[]>
    fastAddCallback?: (unitData: Unit)=>void
}

export const StructureElements = memo((props: StructureElementsProps) => {

    const { data , structure , fastAddCallback } = props;
    const dispatch = useAppDispatch();



    const moreDataCallbackClick = useCallback((parentId: string) => {
        dispatch(getUnitList({ 'parentId': parentId ?? '' }));
    },[dispatch]);

    const lessDataCallbackClick = useCallback((unitId: string)=> {
        dispatch(StructurePageActions.deleteStructureItems(unitId));
    },[dispatch, structure]);

    return (
        <VStack align={'start'} className={cls.StructureElement} justify={'start'} max>
            {data?.map((unit)=>{
                const childKeysList = (structure && Object.keys(structure).filter(el=>el===unit._id)) ?? [];

                return (
                    <VStack key={unit._id} max justify={'start'} align={'start'}>
                        <UnitStructureCard
                            key={unit._id}
                            unitData={unit}
                            moreDataCallback={moreDataCallbackClick}
                            lessDataCallback={lessDataCallbackClick}
                            fastAddCallback={fastAddCallback}
                        />
                        {
                            childKeysList && childKeysList.length
                                ? <StructureElements
                                    data={structure ? structure[childKeysList.filter(el=>unit._id === el)[0]] : []}
                                    structure={structure}
                                    fastAddCallback={fastAddCallback}
                                />
                                : null
                        }
                    </VStack>
                );
            })}
        </VStack>
    );
});

StructureElements.displayName = 'StructureElements';